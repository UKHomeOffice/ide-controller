// Global imports
import PropTypes from 'prop-types';
import React, { forwardRef, useEffect } from 'react';

// Local imports
import { getCameraDevices } from '../../helpers/camera';

const Video = forwardRef(
  ({ captureOptions, cameraId, className }, videoRef) => {
    const getVideoOptionsWithExactDeviceId = (selectedDeviceId) => ({
      ...captureOptions,
      video: {
        deviceId: { exact: selectedDeviceId },
        ...captureOptions.video,
      },
    });

    const setupCamera = async (options) => {
      const stream = await navigator.mediaDevices.getUserMedia(options);
      const video = videoRef.current;
      video.srcObject = stream;
      video.play();
      video.addEventListener('pause', () =>
        stream.getTracks().forEach((track) => track.stop())
      );
    };

    const findDefaultCamera = async (defaultDeviceName) => {
      const cameraDevices = await getCameraDevices();
      return cameraDevices.find((device) =>
        device.label.includes(defaultDeviceName)
      );
    };

    useEffect(() => {
      (async () => {
        const { sourceModel } = captureOptions.video;
        const selectedDeviceId =
          cameraId ||
          (sourceModel
            ? (await findDefaultCamera(sourceModel))?.deviceId
            : null);
        const videoOptions = selectedDeviceId
          ? getVideoOptionsWithExactDeviceId(selectedDeviceId)
          : captureOptions;
        setupCamera(videoOptions);
      })();
    }, [videoRef]);

    return (
      <video
        ref={videoRef}
        width={captureOptions.video.width}
        height={captureOptions.video.height}
        className={className}
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
  className: null,
};

export default Video;
