import { sendToElectronStore } from './ipcMainEvents';

const ALLOWED_KEYS = [
  'DateOfBirth',
  'DocType',
  'IssuingState',
  'Nationality',
  'Sex',
];

let currentData = {};

const resetCurrentData = () => {
  currentData = {
    deviceStatus: [],
    PAGE_READER_EVENT: [],
    Livephoto: [],
  };
};
resetCurrentData();

const CD_CODELINE_DATA = (data) => {
  Object.keys(data.codelineData).forEach((entry) => {
    if (!data.codelineData[entry]) return;
    try {
      if (ALLOWED_KEYS.includes(entry)) {
        if (entry === 'DateOfBirth') {
          currentData.YearOfBirth = data.codelineData[entry].Year;
        } else {
          currentData[entry] = data.codelineData[entry];
        }
      }
    } catch (error) {
      sendToElectronStore('Error', error);
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
      currentData.uuid = data;
      break;
    case 'PAGE_READER_EVENT':
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

export default {};
