// Global imports
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

// Local imports
import {
  getCameraDevices,
  getCroppedImageCoordination,
} from '../../helpers/camera';
import { drawImage } from '../../helpers/canvas';
import { sendCameraDevices } from '../../helpers/ipcMainEvents';
import { logDataEvent } from '../../helpers/log';
import { blankAvatar } from '../../images';
import { Button, StatusBar } from '../Atoms';
import { EventSourceContext } from '../Context/EventSource';
import { StatusContext } from '../Context/Status';
import { Column, Row } from '../Layout';
import ImageCard from './ImageCard';
import LiveImage from './LiveImage';
import PhotoHeaders from './PhotoHeaders';

// Config
import { livePhotoConfig } from '../../config/camera';
import {
  END_OF_DOCUMENT_DATA,
  START_OF_DOCUMENT_DATA,
  IDENTITY_CARD,
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

const findDefaultCamera = async (defaultDeviceName) => {
  const cameraDevices = await getCameraDevices();
  return cameraDevices?.find((device) =>
    device.label.includes(defaultDeviceName)
  );
};

const { sourceModel } = livePhotoConfig.video;
const selectedDeviceId = async () =>
  sourceModel ? (await findDefaultCamera(sourceModel))?.deviceId : null;

const chipStatusTextMap = {
  failed: 'Scanner not connected',
  success: 'Scanner connected',
  loading: 'Reading ID document',
  noData: 'No chip found in document',
  scanBack: 'Scan back of document',
};

const ImagePanel = ({ isActive }) => {
  const { eventSourceContext } = useContext(EventSourceContext);
  const {
    eventSourceEvent,
    CD_SCDG2_PHOTO,
    CD_IMAGEPHOTO,
    CD_CODELINE_DATA,
  } = eventSourceContext;
  const { setEventSourceContext } = useContext(EventSourceContext);
  const { statusContext } = useContext(StatusContext);

  const [cameraDeviceId, setCameraDeviceId] = useState(null);
  const [canRetakeImage, setCanRetakeImage] = useState(true);
  const [liveImageKey, setLiveImageKey] = useState('initial-liveImageKey');
  const [docImageCard, setDocImageCard] = useState(blankAvatar);

  const isIDCard = CD_CODELINE_DATA?.codelineData?.DocType === IDENTITY_CARD;

  useEffect(() => {
    const base64Image =
      CD_IMAGEPHOTO && `data:image/jpeg;base64,${CD_IMAGEPHOTO.image}`;
    if (base64Image) {
      const image = new Image();
      image.src = base64Image;
      image.onload = () => {
        getCroppedImageCoordination(image).then((res) => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext('2d');
          const sourceImage = {
            image,
            x: res.sourceX,
            y: res.sourceY,
            width: res.calculatedWidth,
            height: res.calculatedHeight,
          };
          const destinationImage = {
            width: livePhotoConfig.canvas.width,
            height: livePhotoConfig.canvas.height,
          };
          drawImage(context, sourceImage, destinationImage);
          setDocImageCard(canvas.toDataURL('image/jpeg'));
          setEventSourceContext({
            ...eventSourceContext,
            croppedDocumentImage: canvas.toDataURL('image/jpeg'),
          });
        });
      };
    } else {
      setDocImageCard(blankAvatar);
    }
    // eslint-disable-next-line
  }, [CD_IMAGEPHOTO]);

  const restartLiveImage = () => {
    setCanRetakeImage(false);
    setLiveImageKey(`liveImageKey-${Date.now()}`);
    setTimeout(() => setCanRetakeImage(true), 1000);
    logDataEvent('Livephoto', 'Retake Camera Image');
  };

  useEffect(() => {
    selectedDeviceId().then(setCameraDeviceId);

    ipcRenderer.on('webCamDevices', (event, { deviceId }) => {
      setCameraDeviceId(deviceId);
      logDataEvent('Livephoto', 'New camera selected');
    });
    navigator.mediaDevices.ondevicechange = () => {
      sendCameraDevices();
      selectedDeviceId().then(setCameraDeviceId);
      logDataEvent('Livephoto', 'USB Device Change');
    };
  }, []);

  useEffect(() => {
    if (
      eventSourceEvent === START_OF_DOCUMENT_DATA ||
      eventSourceEvent?.startsWith('RESTART')
    ) {
      restartLiveImage();
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
          <StatusBar
            text={chipStatusTextMap.scanBack}
            visible={isIDCard}
            status="scanBack"
          />
          <ImageCard
            image={docImageCard}
            imageAlt="CD_IMAGEPHOTO"
            className={
              !CD_IMAGEPHOTO || isIDCard
                ? 'photoContainer--with-status-bar'
                : ''
            }
          />
        </Column>
        {/*
          The reason why we have useMemo here is because LiveImage is computationally expensive.
          And we don't want any unintended re-rendering.
        */}
        {useMemo(
          () => (
            <Column size="one-third">
              {cameraDeviceId && (
                <LiveImage
                  key={liveImageKey}
                  cameraId={cameraDeviceId}
                  className={cameraDeviceId ? 'display' : 'display-none'}
                />
              )}
              <div className={!cameraDeviceId ? 'display' : 'display-none'}>
                <StatusBar
                  text="Camera not connected"
                  visible={!CD_IMAGEPHOTO}
                  status="failed"
                />
                {makeImageCard('Live image', null, true)}
              </div>
            </Column>
          ),
          // eslint-disable-next-line
          [liveImageKey, cameraDeviceId]
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
