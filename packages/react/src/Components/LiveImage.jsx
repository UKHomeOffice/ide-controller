// Global imports
import React, { useRef, useEffect, useState } from 'react';

// Local imports
import Video from './Video';
import { ResPosenet } from '../helpers';
import './Controller.css';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    width: 300,
    height: 350,
    frameRate: 30,
    acingMode: 'user',
  },
};
const THRESHOLD = 0.99;

const LiveImage = () => {
  const canvasRef = useRef();
  const [videoRef, setVideoRef] = useState(useRef());
  const [pose, setPose] = useState(null);

  const updateCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    videoRef.current.style.display = 'none';
  };
  const estimateSinglePose = async () => {
    const video = videoRef.current;
    if (!video) return;
    const net = await ResPosenet(
      CAPTURE_OPTIONS.video.width,
      CAPTURE_OPTIONS.video.height
    );
    // parameter(imageSource, imageScaleFactor, flipHorizontal, outputStride)
    const singlePose = await net.estimateSinglePose(video, 0.5, false, 16);
    const isBelowThreshold = !!singlePose.keypoints
      .slice(0, 5)
      .find((poseItem) => poseItem.score < THRESHOLD);
    if (isBelowThreshold) {
      estimateSinglePose();
    } else {
      updateCanvas();
      video.pause();
      setPose(singlePose);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.addEventListener('canplay', estimateSinglePose);
  });

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <Video
          ref={videoRef}
          setVideoRef={setVideoRef}
          captureOptions={CAPTURE_OPTIONS}
        />
        <canvas
          hidden={!pose}
          ref={canvasRef}
          width={CAPTURE_OPTIONS.video.width}
          height={CAPTURE_OPTIONS.video.height}
        />
      </div>
    </div>
  );
};

export default LiveImage;
