import React, { useState, useRef } from 'react';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    width: 300,
    height: 350,
    frameRate: 30,
    acingMode: 'user',
  },
};

const Video = () => {
  const videoRef = useRef();
  const [mediaStream, setMediaStream] = useState(null);
  navigator.mediaDevices.getUserMedia(CAPTURE_OPTIONS).then((stream) => {
    setMediaStream(stream);

    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
    }
  });

  return (
    <video
      style={{ borderRadius: '10px' }}
      ref={videoRef}
      onCanPlay={videoRef.current && videoRef.current.play}
      autoPlay
      playsInline
      muted
    />
  );
};

export default Video;
