// Global imports
import PropTypes from 'prop-types';
import React, { forwardRef, useEffect } from 'react';

const Video = forwardRef(
  ({ captureOptions, cameraId, className }, videoRef) => {
    const getVideoOptionsWithExactDeviceId = (selectedDeviceId) => ({
      ...captureOptions,
      video: {
        deviceId: { exact: selectedDeviceId },
        ...captureOptions.video,
      },
    });

    const setupCamera = (options) => {
      navigator.mediaDevices.getUserMedia(options).then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                video.addEventListener('pause', () =>
                  stream.getTracks().forEach((track) => track.stop())
                );
              })
              .catch(() => {
                video = null;
              });
          }
        }
      });
    };

    useEffect(() => {
      try {
        const videoOptions = getVideoOptionsWithExactDeviceId(cameraId);
        setupCamera(videoOptions);
      } catch {
        // console.log()
      }
      // eslint-disable-next-line
    }, [cameraId]);

    return (
      <video
        ref={videoRef}
        width={captureOptions.video.width}
        height={captureOptions.video.height}
        className={className}
        data-testid="atoms-video"
      />
    );
  }
);

Video.propTypes = {
  captureOptions: PropTypes.shape({
    video: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      sourceModel: PropTypes.string,
    }),
    defaultDevice: PropTypes.string,
  }),
  cameraId: PropTypes.string,
  className: PropTypes.string,
};

Video.defaultProps = {
  captureOptions: {
    audio: false,
    video: {
      width: 100,
      height: 100,
    },
    defaultDevice: '',
  },
  cameraId: null,
  className: '',
};

export default Video;
