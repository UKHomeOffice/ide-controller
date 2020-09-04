// Global imports
import React, { useRef, useEffect, useState } from 'react';

// Local imports
import cv from '../opencv'; // can we make this separate npm package
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

const LiveImage = () => {
  const canvasRef = useRef();
  const [videoRef, setVideoRef] = useState(useRef());

  useEffect(() => {
    if (!videoRef.current) return;
    cv.init(videoRef.current, canvasRef.current);
  });

  return (
    <div className="govuk-grid-column-one-third">
      <div className="photoContainer--photo medium at6">
        <Video
          ref={videoRef}
          updateRef={setVideoRef}
          style={{ display: 'none' }}
          captureOptions={CAPTURE_OPTIONS}
        />
        <canvas
          ref={canvasRef}
          width={CAPTURE_OPTIONS.video.width}
          height={CAPTURE_OPTIONS.video.height}
          style={{ borderRadius: '10px' }}
        />
      </div>
    </div>
  );
};

export default LiveImage;
