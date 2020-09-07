// Global imports
import React, { useState, forwardRef } from 'react';

// Local imports
import Config from './Config';

const Video = forwardRef(({ updateRef, style, captureOptions }, videoRef) => {
  const [mediaStream, setMediaStream] = useState(null);
  navigator.mediaDevices.getUserMedia(captureOptions).then((stream) => {
    setMediaStream(stream);

    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      videoRef.current.addEventListener(
        'canplay',
        () => {
          videoRef.current.width = videoRef.current.videoWidth;
          videoRef.current.height = videoRef.current.videoHeight;
          updateRef({ ...videoRef });
        },
        false
      );
    }
  });

  return mediaStream ? (
    <video
      width={captureOptions.video.width}
      height={captureOptions.video.height}
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={style}
    />
  ) : (
    <img src={Config.blankAvatar} alt="Live scan" className="responsive" />
  );
});

export default Video;
