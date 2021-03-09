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
  'ExpiryDate',
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

const formatCodeLineMRZ = (docData) => {
  const docLine1 = docData.codelineData.Line1;
  const docLine2 = docData.codelineData.Line2;
  const docLine3 = docData.codelineData.Line3;

  return `${docLine1}${docLine2}${docLine3}`;
};

const hashOrEmpty = async (mrz) => {
  if (!mrz) return '';
  const hash = await sha256hash(mrz);
  return hash;
};

const mrzHandler = async (data) => {
  const eventName =
    data.dataType === 'CD_CODELINE_DATA' ? 'MRZ#_Scan_Codeline' : 'MRZ#_Chip';
  const formatMRZ = formatCodeLineMRZ(data);
  currentData[eventName] = await hashOrEmpty(formatMRZ);
};

resetCurrentData();

const CD_CODELINE_DATA = (data) => {
  Object.keys(data?.codelineData).forEach(async (entry) => {
    if (ALLOWED_KEYS.includes(entry)) {
      if (entry === 'DateOfBirth') {
        currentData.YearOfBirth = data.codelineData[entry].Year;
      } else if (entry === 'Data') {
        await mrzHandler(data);
      } else {
        currentData[entry] = data.codelineData[entry];
      }
    }
  });
};

const handlePACEData = (data) => {
  currentData[data.dataType] = data.data;
};

export const logDataEvent = (key, data) => {
  if (!key) return;

  switch (key) {
    case 'deviceStatus':
      currentData.deviceStatus.push(data.status);
      break;
    case 'uuid':
      if (currentData.uuid && currentData.uuid !== data) {
        sendToElectronStore('Document Scan Event', 'INFO', currentData);
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
    case 'CD_SCCHIP_AUTHENTICATION_STATUS':
    case 'CD_SAC_STATUS':
    case 'CD_SCBAC_STATUS':
    case 'CD_ACTIVE_AUTHENTICATION':
    case 'CD_SCCROSSCHECK_EFCOM_EFSOD':
    case 'CD_SCTERMINAL_AUTHENTICATION_STATUS':
      handlePACEData(data);
      break;
    case 'Livephoto':
      currentData.Livephoto.push(data);
      break;
    case 'matchingScore':
      currentData.matchingScore = data;
      currentData.scanToScoreDuration =
        (Date.now() - documentStartEventTimestamp) / 1000;
      sendToElectronStore('Document Scan Event', 'INFO', currentData);
      break;
    default:
  }
};

export default () => currentData;
