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
    sourceModel: 'C920',
  },
};
const THRESHOLD = 0.8;
const ZOOM_FACTOR = 1.5;

const LiveImage = () => {
  const canvasRef = useRef('canvas');
  const videoRef = useRef('video');
  const [showVideo, setShowVideo] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);

  const updateCanvas = ({ keypoints }) => {
    setShowCanvas(true);
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
    setShowVideo(false);
  };
  const estimateSinglePose = async () => {
    const video = videoRef.current;
    if (!video) return;
    const net = await ResPosenet(
      CAPTURE_OPTIONS.video.width,
      CAPTURE_OPTIONS.video.height
    );

    const runFun = async () => {
      // parameter(imageSource, imageScaleFactor, flipHorizontal, outputStride)
      const singlePose = await net.estimateSinglePose(video, 0.5, false, 16);
      const isBelowThreshold = !!singlePose.keypoints
        .slice(0, 5)
        .find((poseItem) => poseItem.score < THRESHOLD);
      if (isBelowThreshold) {
        runFun();
      } else {
        video.pause();
        updateCanvas(singlePose);
      }
    };

    runFun();
  };

  useEffect(() => {
    videoRef.current.addEventListener('canplay', estimateSinglePose);
  }, []);

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        {showVideo && <Video ref={videoRef} captureOptions={CAPTURE_OPTIONS} />}
        {showCanvas && (
          <canvas
            ref={canvasRef}
            width={CAPTURE_OPTIONS.video.width}
            height={CAPTURE_OPTIONS.video.height}
          />
        )}
      </div>
    </div>
  );
};

export default LiveImage;
