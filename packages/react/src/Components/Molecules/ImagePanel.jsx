// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo } from 'react';

// Local imports
import { Button } from '../Atoms';
import { blankAvatar } from '../../images';
import { withContext } from '../Context';
import LiveImage from './LiveImage';
import { Column, Row } from '../Layout';
import PhotoHeaders from './PhotoHeaders';
import ImageCard from './ImageCard';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const makeImageCard = (key, { eventSourceData }) => {
  const image =
    eventSourceData &&
    eventSourceData[key] &&
    `data:image/jpeg;base64,${eventSourceData[key].image}`;
  return <ImageCard image={image || blankAvatar} imageAlt={key} />;
};

const ImagePanel = ({ isActive, value }) => {
  const { context, setContext } = value;
  const [liveImageKey, setLiveImageKey] = useState(
    `liveImageKey-${Date.now()}`
  );
  const [cameraDeviceId, setCameraDeviceId] = useState();
  const [canRetakeImage, setCanRetakeImage] = useState(true);
  const restartLiveImage = () => {
    setCanRetakeImage(false);
    setLiveImageKey(`liveImageKey-${Date.now()}`);
    setTimeout(() => setCanRetakeImage(true), 1000);
    setContext({ ...context });
  };

  useEffect(() => {
    ipcRenderer.on('webCamDevices', (event, { deviceId }) => {
      setCameraDeviceId(deviceId);
      restartLiveImage();
    });
  }, []);

  return (
    <div
      className={`govuk-tabs__panel ${
        isActive ? '' : 'govuk-tabs__panel--hidden'
      }`}
      role="tabpanel"
      aria-labelledby="image-data"
    >
      <Row>
        <Column size="full">
          <h2 className="govuk-heading-l">Images to compare</h2>
        </Column>
      </Row>
      <PhotoHeaders />
      <Row>
        <Column size="one-third" className="padding-5">
          {makeImageCard('CD_SCDG2_PHOTO', context)}
        </Column>
        <Column size="one-third" className="padding-5">
          {makeImageCard('CD_IMAGEPHOTO', context)}
        </Column>
        {/*
          The reason why we have useMemo here is because LiveImage is computationally expensive.
          And we don't want any unintended re-rendering.
        */}
        {useMemo(
          () => (
            <LiveImage key={liveImageKey} cameraId={cameraDeviceId} />
          ),
          [liveImageKey]
        )}
        <Button disabled={!canRetakeImage} onClick={restartLiveImage}>
          Retake Camera Image
        </Button>
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
