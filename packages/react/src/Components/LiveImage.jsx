// Global imports
import React, { useRef, useEffect, useState } from 'react';

// Local imports
import Video from './Video';
import { ResPosenet } from '../helpers';
import './Controller.css';
import Canvas from './Canvas';

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

const isBelowThreshold = (singlePose) =>
  !!singlePose.keypoints
    .slice(0, 5)
    .find((poseItem) => poseItem.score < THRESHOLD);

const LiveImage = () => {
  const canvasRef = useRef('canvas');
  const videoRef = useRef('video');
  const [showVideo, setShowVideo] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [sourceImageOptions, setSourceImageOptions] = useState({});

  const calculateSourceImageOptions = ({ keypoints }) => {
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

    setSourceImageOptions({
      sx: xStart - margin,
      sy: yStart - margin,
      sWidth: sWidth + margin * 2,
      sHeight: sHeight + margin * 2,
    });

    setShowVideo(false);
  };
  const estimateSinglePose = async () => {
    const video = videoRef.current;
    if (!video) return;
    const net = await ResPosenet(
      CAPTURE_OPTIONS.video.width,
      CAPTURE_OPTIONS.video.height
    );

    const estimate = async () => {
      // parameter(imageSource, imageScaleFactor, flipHorizontal, outputStride)
      const singlePose = await net.estimateSinglePose(video, 0.5, false, 16);
      if (isBelowThreshold(singlePose)) {
        estimate();
      } else {
        video.pause();
        calculateSourceImageOptions(singlePose);
      }
    };

    estimate();
  };

  useEffect(() => {
    videoRef.current.addEventListener('canplay', estimateSinglePose);
  }, []);

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        {showVideo && <Video ref={videoRef} captureOptions={CAPTURE_OPTIONS} />}
        {showCanvas && sourceImageOptions.sx && (
          <Canvas
            sourceImage={videoRef.current}
            sourceImageOptions={sourceImageOptions}
            ref={canvasRef}
            options={CAPTURE_OPTIONS}
          />
        )}
      </div>
    </div>
  );
};

export default LiveImage;
