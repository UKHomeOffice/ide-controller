// Global imports
import React, { useRef, useEffect, useState } from 'react';

// Local imports
import Video from './Video';
import { ResPosenet } from '../helpers';
import './Controller.css';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    width: 245,
    height: 350,
    frameRate: 30,
    acingMode: 'user',
  },
};
const THRESHOLD = 0.8;
const ZOOM_FACTOR = 1.3;

const LiveImage = () => {
  const canvasRef = useRef();
  const [videoRef, setVideoRef] = useState(useRef());
  const [pose, setPose] = useState();

  const updateCanvas = ({ keypoints }) => {
    const nose = keypoints[0].position;
    const leftEye = keypoints[1].position;
    const rightEye = keypoints[2].position;
    let margin = (nose.y - leftEye.y + (nose.y - rightEye.y)) / 2;
    margin *= ZOOM_FACTOR;

    const xStart = Math.floor(keypoints[4].position.x);
    const xEnd = Math.ceil(keypoints[3].position.x);
    const sWidth = xEnd - xStart;
    const sHeight =
      sWidth * (CAPTURE_OPTIONS.video.height / CAPTURE_OPTIONS.video.width);
    const yNose = Math.floor(keypoints[4].position.y);
    const yStart = yNose - sHeight / 2;

    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(
      videoRef.current,
      xStart - margin,
      yStart - margin,
      sWidth + margin * 2,
      sHeight + margin * 2,
      0,
      0,
      CAPTURE_OPTIONS.video.width,
      CAPTURE_OPTIONS.video.height
    );
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
      video.pause();
      setPose(singlePose);
      updateCanvas(singlePose);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.addEventListener('canplay', estimateSinglePose);
  });

  return (
    <div className="govuk-grid-column-one-third">
      <div
        className="photoContainer--photo medium picture-box"
        alt="Live image"
      >
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
