// Global imports
import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs'; // eslint-disable-line
import * as posenet from '@tensorflow-models/posenet';

// Local imports
import Video from './Video';
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

const estimateSinglePose = async (video, threshold = 0.99) => {
  const net = await posenet.load({
    architecture: 'ResNet50',
    outputStride: 16,
    inputResolution: {
      width: CAPTURE_OPTIONS.video.width,
      height: CAPTURE_OPTIONS.video.height,
    },
    quantBytes: 2,
  });

  // parameter(imageSource, imageScaleFactor, flipHorizontal, outputStride)
  const pose = await net.estimateSinglePose(video, 0.5, false, 16);
  const isBelowThreshold = !!pose.keypoints
    .slice(0, 5)
    .find((poseItem) => poseItem.score < threshold);
  if (isBelowThreshold && !video.paused) {
    setTimeout(() => estimateSinglePose(video), 200);
  } else {
    video.pause();
    video.currentTime = 0;
  }
};

const LiveImage = () => {
  // const canvasRef = useRef();
  const [videoRef, setVideoRef] = useState(useRef());
  // const [pose, setPose] = useState(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.addEventListener('canplay', () =>
      estimateSinglePose(videoRef.current)
    );
  });

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        {pose ? (
          <Video
            ref={videoRef}
            setVideoRef={setVideoRef}
            captureOptions={CAPTURE_OPTIONS}
          />
        ) : (
          {
            /* <canvas
          hidden
          ref={canvasRef}
          width={CAPTURE_OPTIONS.video.width}
          height={CAPTURE_OPTIONS.video.height}
          style={{ borderRadius: '10px 10px 0 0' }}
        /> */
          }
        )}
      </div>
    </div>
  );
};

export default LiveImage;
