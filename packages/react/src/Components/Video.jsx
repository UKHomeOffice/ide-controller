// Global imports
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Video = forwardRef(({ captureOptions }, videoRef) => {
  navigator.mediaDevices
    .getUserMedia(captureOptions)
    .then((stream) => {
      if (videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        videoRef.current.addEventListener('pause', () =>
          stream.getTracks().forEach((track) => track.stop())
        );
      }
    })
    .catch(console.error);

  return (
    <video
      ref={videoRef}
      width={captureOptions.video.width}
      height={captureOptions.video.height}
    />
  );
});

Video.propTypes = {
  captureOptions: PropTypes.object,
};

export default Video;
