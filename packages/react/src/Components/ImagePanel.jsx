// Global imports
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// Local imports
import Button from './Atoms/Button';
import LiveImage from './LiveImage';
import PhotoHeaders from './PhotoHeaders';
import Image from './Atoms/Image';
import ImageCard from './ImageCard';

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
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h2 className="govuk-heading-l">Images to compare</h2>
        </div>
      </div>
      <PhotoHeaders />
      <div className="govuk-grid-row">
        <ImageCard>
          <Image imageID="CD_IMAGEPHOTO" imageAlt="Scan" />
        </ImageCard>
        <ImageCard>
          <Image imageID="CD_SCDG2_PHOTO" imageAlt="Chip" />
        </ImageCard>
        <ImageCard>
          {restartCam && <LiveImage cameraDeviceId={cameraDeviceId} />}
        </ImageCard>
        <Button onClick={restartLiveImage}>Retake Camera Image</Button>
      </div>
    </div>
  );
};

ImagePanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default ImagePanel;
