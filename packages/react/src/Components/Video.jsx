// Global imports
import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const electron = window.require('electron');
const { ipcRenderer } = electron;

ipcRenderer.on('webCamDevices', (event, data) => {});
const Video = forwardRef(({ captureOptions }, videoRef) => {
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) =>
        devices.filter((device) => device.kind === 'videoinput')
      )
      .then((cameraDevices) => {
        const webCam = cameraDevices.find((device) =>
          device.label.includes(captureOptions.video.sourceModel)
        );
        const devices = cameraDevices.map((device) => ({
          label: device.label,
          deviceId: device.deviceId,
        }));

        ipcRenderer.send('webCamDevices', devices);
        const videoOptions = {
          ...captureOptions,
          video: {
            ...(webCam ? { chromeMediaSourceId: webCam.deviceId } : {}),
            ...captureOptions.video,
          },
        };

        console.log(videoOptions);

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
  }, [videoRef]);

  return (
    <video
      ref={videoRef}
      width={captureOptions.video.width}
      height={captureOptions.video.height}
    />
  );
});

export default Video;
