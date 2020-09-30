// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import Button from './Atoms/Button';
import ChipImage from './ChipImage';
import { Row } from './Layout';
import LiveImage from './LiveImage';
import PhotoHeaders from './PhotoHeaders';
import ScanImage from './ScanImage';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const ImagePanel = ({ isActive }) => {
  const [restartCam, setRestartCam] = useState(true);
  const [cameraDeviceId, setCameraDeviceId] = useState();
  const restartLiveImage = () => {
    setRestartCam(false);
    setTimeout(() => setRestartCam(true), 0);
  };

  useEffect(() => {
    ipcRenderer.on('webCamDevices', (event, data) => {
      setCameraDeviceId(data.deviceId);
      restartLiveImage();
    });
  });

  return (
    <div
      className={`govuk-tabs__panel ${
        isActive ? '' : 'govuk-tabs__panel--hidden'
      }`}
      role="tabpanel"
      aria-labelledby="image-data"
    >
      <Row>
        <div className="govuk-grid-column-full">
          <h2 className="govuk-heading-l">Images to compare</h2>
        </div>
      </Row>
      <PhotoHeaders />
      <Row>
        <ChipImage />
        <ScanImage />
        {restartCam && <LiveImage cameraDeviceId={cameraDeviceId} />}
        <Button onClick={restartLiveImage}>Retake Camera Image</Button>
      </Row>
    </div>
  );
};

ImagePanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default ImagePanel;
