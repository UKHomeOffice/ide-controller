// Local imports
import { sendToElectronStore } from './ipcMainEvents';
import { sha256hash } from './common';
import {
  END_OF_DOCUMENT_DATA,
  START_OF_DOCUMENT_DATA,
} from '../config/EventSource';

const ALLOWED_KEYS = [
  'DateOfBirth',
  'DocType',
  'IssuingState',
  'Nationality',
  'Sex',
  'Data',
];

let currentData = {};
let documentStartEventTimestamp;

const resetCurrentData = () => {
  currentData = {
    deviceStatus: [],
    PAGE_READER_EVENT: [],
    Livephoto: [],
  };
};
resetCurrentData();

const CD_CODELINE_DATA = (data) => {
  Object.keys(data.codelineData).forEach(async (entry) => {
    if (ALLOWED_KEYS.includes(entry)) {
      if (entry === 'DateOfBirth') {
        currentData.YearOfBirth = data.codelineData[entry].Year;
      } else if (entry === 'Data') {
        currentData.mrzHash = await sha256hash(data.codelineData[entry]);
      } else {
        currentData[entry] = data.codelineData[entry];
      }
    }
  });
};

export const logDataEvent = (key, data) => {
  if (!key) return;

  switch (key) {
    case 'deviceStatus':
      currentData.deviceStatus.push(data.status);
      break;
    case 'uuid':
      if (currentData.uuid && currentData.uuid !== data) {
        sendToElectronStore(currentData);
        resetCurrentData();
      }
      currentData.uuid = data;
      break;
    case 'PAGE_READER_EVENT':
      if (data.event === START_OF_DOCUMENT_DATA) {
        documentStartEventTimestamp = Date.now();
      } else if (data.event === END_OF_DOCUMENT_DATA) {
        currentData.scanDuration =
          (Date.now() - documentStartEventTimestamp) / 1000;
      }
      currentData.PAGE_READER_EVENT.push(data.event);
      break;
    case 'CD_IMAGEIR':
    case 'CD_IMAGEVIS':
    case 'CD_IMAGEPHOTO':
    case 'CD_SCDG2_PHOTO':
    case 'CD_IMAGEUV':
    case 'CD_CODELINE':
    case 'CD_SCDG1_CODELINE':
      break;
    case 'CD_CODELINE_DATA':
    case 'CD_SCDG1_CODELINE_DATA':
      CD_CODELINE_DATA(data);
      break;
    case 'Livephoto':
      currentData.Livephoto.push(data);
      break;
    case 'matchingScore':
      currentData.matchingScore = data;
      sendToElectronStore(currentData);
      resetCurrentData();
      break;
    default:
  }
};

export default () => currentData;
