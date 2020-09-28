// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

// Local imports
import { livePhotoConfig } from '../config/cameraOptions';
import {
  getSourceImageOptions,
  isBelowThreshold,
  ResPosenet,
} from '../helpers/camera';
import Canvas from './Canvas';
import './Controller.css';
import Video from './Video';

const LiveImage = ({ deviceId }) => {
  const canvasRef = useRef('canvas');
  const videoRef = useRef('video');
  const [showVideo, setShowVideo] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [sourceImageOptions, setSourceImageOptions] = useState({});

  const estimate = async (net) => {
    if (!videoRef.current) return;
    // parameter(imageSource, imageScaleFactor, flipHorizontal, outputStride)
    const pose = await net.estimateSinglePose(videoRef.current, 0.5, false, 16);
    if (isBelowThreshold(pose)) {
      estimate(net);
    } else {
      videoRef.current.pause();
      const { sx, sy, sWidth, sHeight } = getSourceImageOptions(pose);
      setSourceImageOptions({ sx, sy, sWidth, sHeight });
      setShowCanvas(true);
      setShowVideo(false);
    }
  };

  const initResPosenet = async () => {
    if (!videoRef.current) return;
    const net = await ResPosenet();
    estimate(net);
  };

  useEffect(() => {
    videoRef.current.addEventListener('canplay', initResPosenet);
  }, [videoRef]);

  return (
    <>
      {showVideo && (
        <Video
          ref={videoRef}
          deviceId={deviceId}
          captureOptions={livePhotoConfig}
        />
      )}
      {showCanvas && sourceImageOptions.sx && (
        <Canvas
          sourceImage={videoRef.current}
          sourceImageOptions={sourceImageOptions}
          ref={canvasRef}
          options={livePhotoConfig}
        />
      )}
    </>
  );
};

export default LiveImage;

LiveImage.propTypes = {
  deviceId: PropTypes.string,
};

LiveImage.defaultProps = {
  deviceId: null,
};
