// Global imports
import React, { useRef, useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';

// Local imports
import Video from './Video';
import {
  ResPosenet,
  isBelowThreshold,
  getSourceImageOptions,
} from '../helpers/tf';
import './Controller.css';
import Canvas from './Canvas';
import { livePhotoConfig } from '../config/cameraOptions';

const electron = window.require('electron');
const { ipcRenderer } = electron;

let CAPTURE_OPTIONS = {
  ...livePhotoConfig,
};

const LiveImage = ({ restartCam }) => {
  const canvasRef = useRef('canvas');
  const videoRef = useRef('video');
  const [showVideo, setShowVideo] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [sourceImageOptions, setSourceImageOptions] = useState({});

  const calculateSourceImageOptions = ({ keypoints }) => {
    setShowCanvas(true);
    const { sx, sy, sWidth, sHeight } = getSourceImageOptions(keypoints);
    setSourceImageOptions({ sx, sy, sWidth, sHeight });
    setShowVideo(false);
  };
  const estimateSinglePose = async () => {
    const video = videoRef.current;
    if (!video) return;
    const net = await ResPosenet(
      livePhotoConfig.video.width,
      livePhotoConfig.video.height
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

    ipcRenderer.on('webCamDevices', (event, data) => {
      CAPTURE_OPTIONS = {
        ...CAPTURE_OPTIONS,
        video: {
          ...CAPTURE_OPTIONS.video,
          deviceId: { exact: data.deviceId },
        },
      };
      setShowCanvas(false);
      setShowVideo(true);
      setSourceImageOptions({});
      setTimeout(
        () => videoRef.current.addEventListener('canplay', estimateSinglePose),
        0
      );
    });
  }, [videoRef]);

  useEffect(() => {
    setShowCanvas(false);
    setShowVideo(true);
  }, [restartCam]);

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

LiveImage.propTypes = {
  restartCam: PropTypes.bool,
};

LiveImage.defaultProps = {
  restartCam: false,
};

const areEqual = (prevProps, nextProps) =>
  prevProps.restartCam === nextProps.restartCam;

export default memo(LiveImage, areEqual);
