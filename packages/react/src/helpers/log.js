import { sendToElectronStore } from './ipcMainEvents';

const ALLOWED_KEYS = [
  'DateOfBirth',
  'DocType',
  'IssuingState',
  'Nationality',
  'Sex',
];

const ALLOWED_DATA_TYPE = ['CD_CODELINE_DATA', 'CD_SCDG1_CODELINE_DATA'];

export const logDataEvent = (messageData, datadata) => {
  const { dataType } = messageData;
  if (messageData[dataType]) {
    sendToElectronStore(dataType, datadata);
  }
  if (ALLOWED_DATA_TYPE.includes(dataType)) {
    Object.keys(messageData.codelineData).forEach((key) => {
      try {
        if (ALLOWED_KEYS.includes(key)) {
          if (key === 'DateOfBirth') {
            sendToElectronStore(
              'YearOfBirth',
              messageData.codelineData[key].Year
            );
          } else {
            sendToElectronStore(key, messageData.codelineData[key]);
          }
        }
      } catch (error) {
        sendToElectronStore('Error', error);
      }
    });
  }
};

export default {};
