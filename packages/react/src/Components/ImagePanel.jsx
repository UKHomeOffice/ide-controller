// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import Button from './Atoms/Button';
import Config from './Config';
import DocumentImage from './DocumentImage';
import { ImageConsumer } from './ImageContext';
import LiveImage from './LiveImage';
import { Row } from './Layout';
import PhotoHeaders from './PhotoHeaders';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const constructImageURL = (base64) => `data:image/jpeg;base64,${base64}`;

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
        <ImageConsumer>
          {(fullPage) => {
            const docData = new Map(fullPage);
            const chipImage = docData.has('CD_SCDG2_PHOTO')
              ? constructImageURL(docData.get('CD_SCDG2_PHOTO').image)
              : Config.blankAvatar;
            const scanImage = docData.has('CD_IMAGEPHOTO')
              ? constructImageURL(docData.get('CD_IMAGEPHOTO').image)
              : Config.blankAvatar;
            return (
              <>
                <DocumentImage image={chipImage} imageAlt="Chip" />
                <DocumentImage image={scanImage} imageAlt="Scan" />
              </>
            );
          }}
        </ImageConsumer>
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
