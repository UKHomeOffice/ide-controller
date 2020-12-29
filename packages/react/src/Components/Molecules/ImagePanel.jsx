// Global imports
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';

// Local imports
import { blankAvatar } from '../../images';
import { Button, StatusBar } from '../Atoms';
import { EventSourceContext } from '../Context/EventSource';
import { StatusContext } from '../Context/Status';
import { Column, Row } from '../Layout';
import ImageCard from './ImageCard';
import LiveImage from './LiveImage';
import PhotoHeaders from './PhotoHeaders';
import { logDataEvent } from '../../helpers/log';
import {
  END_OF_DOCUMENT_DATA,
  START_OF_DOCUMENT_DATA,
} from '../../config/EventSource';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const makeImageCard = (key, event, statusBar = false) => {
  const image = event && `data:image/jpeg;base64,${event.image}`;
  return (
    <ImageCard
      image={image || blankAvatar}
      imageAlt={key}
      className={statusBar ? 'photoContainer--with-status-bar' : ''}
    />
  );
};

const chipStatusTextMap = {
  failed: 'Scanner not connected',
  success: 'Scanner connected',
  loading: 'Reading ID document',
  noData: 'No chip found in document',
};

const ImagePanel = ({ isActive }) => {
  const { eventSourceEvent, CD_SCDG2_PHOTO, CD_IMAGEPHOTO } = useContext(
    EventSourceContext
  ).eventSourceContext;
  const { statusContext } = useContext(StatusContext);

  const [cameraDeviceId, setCameraDeviceId] = useState();
  const [canRetakeImage, setCanRetakeImage] = useState(true);
  const [liveImageKey, setLiveImageKey] = useState('initial-liveImageKey');

  const restartLiveImage = () => {
    setCanRetakeImage(false);
    setLiveImageKey(`liveImageKey-${Date.now()}`);
    setTimeout(() => setCanRetakeImage(true), 1000);
    logDataEvent('Livephoto', 'Retake Camera Image');
  };

  useEffect(() => {
    ipcRenderer.on('webCamDevices', (event, { deviceId }) => {
      setCameraDeviceId(deviceId);
      restartLiveImage();
    });
  }, []);

  useEffect(() => {
    if (
      eventSourceEvent === START_OF_DOCUMENT_DATA ||
      eventSourceEvent?.startsWith('RESTART')
    ) {
      restartLiveImage();
    }
  }, [eventSourceEvent]);

  const [chipStatus, setChipStatus] = useState();
  const [documentStatus, setDocumentStatus] = useState();
  const [chipStatusBarText, setChipStatusBarText] = useState('');
  const [documentStatusBarText, setDocumentStatusBarText] = useState('');

  // watch chip image
  useEffect(() => {
    const isDocReaderOk = statusContext === 'OK';
    const isDocReaderNotOk = statusContext === 'FAILURE';
    const isScanFinish = eventSourceEvent === END_OF_DOCUMENT_DATA;
    const isScanStart = eventSourceEvent === START_OF_DOCUMENT_DATA;
    const noChipImage = !CD_SCDG2_PHOTO;
    const noDocumentImage = !CD_IMAGEPHOTO;

    const chipStat = isDocReaderNotOk
      ? 'failed'
      : isDocReaderOk && !isScanFinish && !isScanStart && noChipImage
      ? 'success'
      : isDocReaderOk && isScanStart
      ? 'loading'
      : isDocReaderOk && isScanFinish && noChipImage
      ? 'noData'
      : 'failed';

    const docStat = isDocReaderNotOk
      ? 'failed'
      : isDocReaderOk && !isScanFinish && !isScanStart && noDocumentImage
      ? 'success'
      : isDocReaderOk && isScanStart
      ? 'loading'
      : isDocReaderOk && isScanFinish && noDocumentImage
      ? 'noData'
      : 'failed';

    setChipStatus(chipStat);
    setDocumentStatus(docStat);
    setChipStatusBarText(chipStatusTextMap[chipStat]);
    setDocumentStatusBarText(chipStatusTextMap[docStat]);
  }, [eventSourceEvent, CD_SCDG2_PHOTO, statusContext, useRef()]);

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
          <StatusBar
            text={chipStatusBarText}
            visible={!CD_SCDG2_PHOTO}
            status={chipStatus}
          />
          {makeImageCard('CD_SCDG2_PHOTO', CD_SCDG2_PHOTO, !CD_SCDG2_PHOTO)}
        </Column>
        <Column size="one-third">
          <StatusBar
            text={documentStatusBarText}
            visible={!CD_IMAGEPHOTO}
            status={documentStatus}
          />
          {makeImageCard('CD_IMAGEPHOTO', CD_IMAGEPHOTO, !CD_IMAGEPHOTO)}
        </Column>
        {/*
          The reason why we have useMemo here is because LiveImage is computationally expensive.
          And we don't want any unintended re-rendering.
        */}
        {useMemo(
          () => (
            <Column size="one-third">
              <LiveImage key={liveImageKey} cameraId={cameraDeviceId} />
            </Column>
          ),
          [liveImageKey]
        )}
      </Row>
      <div className="govuk-section-break--m" />
      <div className="govuk-grid-row flex-direction-row-reverse">
        <Column size="one-third">
          <Button disabled={!canRetakeImage} onClick={restartLiveImage}>
            Retake camera image
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
