// Global imports
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useState } from 'react';

// Local imports
import { blankAvatar } from '../../images';
import { Button } from '../Atoms';
import { EventSourceContext } from '../Context/EventSource';
import { Column, Row } from '../Layout';
import ImageCard from './ImageCard';
import LiveImage from './LiveImage';
import PhotoHeaders from './PhotoHeaders';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const makeImageCard = (key, event) => {
  const image = event && `data:image/jpeg;base64,${event.image}`;
  return <ImageCard image={image || blankAvatar} imageAlt={key} />;
};

const ImagePanel = ({ isActive }) => {
  const { eventSourceEvent, CD_SCDG2_PHOTO, CD_IMAGEPHOTO } = useContext(
    EventSourceContext
  );

  const [cameraDeviceId, setCameraDeviceId] = useState();
  const [canRetakeImage, setCanRetakeImage] = useState(true);
  const [liveImageKey, setLiveImageKey] = useState('initial-liveImageKey');

  const restartLiveImage = () => {
    setCanRetakeImage(false);
    setLiveImageKey(`liveImageKey-${Date.now()}`);
    setTimeout(() => setCanRetakeImage(true), 1000);
  };

  useEffect(() => {
    ipcRenderer.on('webCamDevices', (event, { deviceId }) => {
      setCameraDeviceId(deviceId);
      restartLiveImage();
    });
  }, []);

  useEffect(() => {
    if (eventSourceEvent === 'START_OF_DOCUMENT_DATA') {
      restartLiveImage();
    }
  }, [eventSourceEvent]);

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
          <h2 className="govuk-heading-l font--xl">Images to compare</h2>
        </Column>
      </Row>
      <PhotoHeaders />
      <Row>
        <Column size="one-third">
          {makeImageCard('CD_SCDG2_PHOTO', CD_SCDG2_PHOTO)}
        </Column>
        <Column size="one-third">
          {makeImageCard('CD_IMAGEPHOTO', CD_IMAGEPHOTO)}
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
      </Row>
      <div className="govuk-section-break--m" />
      <div className="govuk-grid-row flex-direction-row-reverse">
        <Column size="one-third">
          <Button disabled={!canRetakeImage} onClick={restartLiveImage}>
            Retake Camera Image
          </Button>
        </Column>
      </div>
    </div>
  );
};

ImagePanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default ImagePanel;
