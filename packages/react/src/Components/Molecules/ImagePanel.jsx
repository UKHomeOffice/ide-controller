// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import { Button } from '../Atoms';
import { blankAvatar } from '../Config';
import DocumentImage from './DocumentImage';
import { withContext } from '../Context';
import LiveImage from './LiveImage';
import { Row } from '../Layout';
import PhotoHeaders from './PhotoHeaders';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const ImagePanel = ({ isActive, value }) => {
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

  const makeDocumentImage = (key) => {
    const image =
      value.context[key] &&
      `data:image/jpeg;base64,${value.context[key].image}`;
    return <DocumentImage image={image || blankAvatar} imageAlt="Chip" />;
  };

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
        {makeDocumentImage('CD_SCDG2_PHOTO')}
        {makeDocumentImage('CD_IMAGEPHOTO')}
        {restartCam && <LiveImage cameraDeviceId={cameraDeviceId} />}
        <Button onClick={restartLiveImage}>Retake Camera Image</Button>
      </Row>
    </div>
  );
};

ImagePanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
  value: PropTypes.shape({
    context: PropTypes.shape({}),
    setContext: PropTypes.func,
  }),
};

ImagePanel.defaultProps = {
  value: {},
};

export default withContext(ImagePanel);
