// Global imports
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Video = forwardRef(({ captureOptions }, videoRef) => {
  navigator.mediaDevices.getUserMedia(captureOptions).then((stream) => {
    if (videoRef.current && !videoRef.current.srcObject) {
      const video = videoRef.current;
      video.srcObject = stream;
      video.play();

      video.addEventListener('pause', () =>
        stream.getTracks().forEach((track) => track.stop())
      );
    }
  });

  return (
    <video
      ref={videoRef}
      width={captureOptions.video.width}
      height={captureOptions.video.height}
    />
  );
});

Video.propTypes = {
  captureOptions: PropTypes.shape({
    video: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default Video;
