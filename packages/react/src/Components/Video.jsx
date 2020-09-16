// Global imports
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Video = forwardRef(({ captureOptions }, videoRef) => {
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) =>
      devices
        .filter((device) => device.kind === 'videoinput')
        .find((device) =>
          device.label.includes(captureOptions.video.sourceModel)
        )
    )
    .then((webCam) => {
      const videoOptions = {
        ...captureOptions,
        video: {
          ...(webCam ? { chromeMediaSourceId: webCam.deviceId } : {}),
          ...captureOptions.video,
        },
      };

      navigator.mediaDevices
        .getUserMedia({ ...captureOptions, ...videoOptions })
        .then((stream) => {
          if (videoRef.current && !videoRef.current.srcObject) {
            const video = videoRef.current;
            video.srcObject = stream;
            video.play();

            video.addEventListener('pause', () =>
              stream.getTracks().forEach((track) => track.stop())
            );
          }
        });
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
      sourceModel: PropTypes.string,
    }),
  }).isRequired,
};

export default Video;
