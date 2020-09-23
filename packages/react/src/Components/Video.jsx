// Global imports
import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Local imports
import { getCameraDevices } from '../helpers/camera';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const Video = forwardRef(({ captureOptions, deviceId }, videoRef) => {
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

  const findDefaultCamera = (cameraDevices) =>
    cameraDevices.find((device) =>
      device.label.includes(captureOptions.video.sourceModel)
    );
  useEffect(() => {
    (async () => {
      const cameraDevices = await getCameraDevices();
      ipcRenderer.send('webCamDevices', cameraDevices);
      const { defaultDevice } = captureOptions;
      const selectedDeviceId =
        deviceId ||
        (defaultDevice ? findDefaultCamera(defaultDevice).deviceId : null);
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
    />
  );
});

Video.propTypes = {
  captureOptions: PropTypes.shape({
    video: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      sourceModel: PropTypes.string,
      deviceId: PropTypes.string,
    }),
    defaultDevice: PropTypes.string,
  }),
  deviceId: PropTypes.string,
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
  deviceId: null,
};

export default Video;
