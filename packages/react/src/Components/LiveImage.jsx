// Global imports
import React, { useRef, useEffect, useState, memo } from 'react';

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

// const electron = window.require('electron');
// const { ipcRenderer } = electron;

const CAPTURE_OPTIONS = {
  ...livePhotoConfig,
};

const LiveImage = () => {
  const canvasRef = useRef('canvas');
  const videoRef = useRef('video');
  const [showVideo, setShowVideo] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [sourceImageOptions, setSourceImageOptions] = useState({});

  const estimate = async (net) => {
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

    // ipcRenderer.on('webCamDevices', (event, data) => {
    //   CAPTURE_OPTIONS = {
    //     ...CAPTURE_OPTIONS,
    //     video: {
    //       ...CAPTURE_OPTIONS.video,
    //       deviceId: { exact: data.deviceId },
    //     },
    //   };
    //   setShowCanvas(false);
    //   setShowVideo(true);
    //   setSourceImageOptions({});
    //   setTimeout(
    //     () => videoRef.current.addEventListener('canplay', initResPosenet),
    //     0
    //   );
    // });
  }, [videoRef]);

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
