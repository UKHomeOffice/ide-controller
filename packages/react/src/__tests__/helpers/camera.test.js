import '@testing-library/jest-dom/extend-expect';
import faceJson1 from './imgs/1.json';
import faceJson2 from './imgs/2.json';
import faceJson3 from './imgs/3.json';
import faceJson4 from './imgs/4.json';
import faceJson5 from './imgs/5.json';
import faceJson6 from './imgs/6.json';
import faceJson7 from './imgs/7.json';
import faceJson8 from './imgs/8.json';

import FaceLandmark from '../../helpers/camera';

const faceLandmark = new FaceLandmark();

describe('<camera />', () => {
  it('Eye Distance 120 test 1 ', async () => {
    faceLandmark.prediction = faceJson1;
    const res = faceLandmark.isDistance120px();
    expect(res).toBeTruthy();
  });
  it('Eye Distance 120 test 2 ', async () => {
    faceLandmark.prediction = faceJson2;
    const res = faceLandmark.isDistance120px();
    expect(res).toBeTruthy();
  });
  it('Eye Distance 120 test 3 ', async () => {
    faceLandmark.prediction = faceJson3;
    const res = faceLandmark.isDistance120px();
    expect(res).toBeTruthy();
  });
  it('Eye Distance 120 test 4 ', async () => {
    faceLandmark.prediction = faceJson4;
    const res = faceLandmark.isDistance120px();
    expect(res).toBeTruthy();
  });
  it('Eye Distance 120 test 5 ', async () => {
    faceLandmark.prediction = faceJson5;
    const res = faceLandmark.isDistance120px();
    expect(res).toBeFalsy();
  });
  it('Eye Distance 120 test 6 ', async () => {
    faceLandmark.prediction = faceJson6;
    const res = faceLandmark.isDistance120px();
    expect(res).toBeFalsy();
  });
  it('Eye Distance 120 test 7 ', async () => {
    faceLandmark.prediction = faceJson7;
    const res = faceLandmark.isDistance120px();
    expect(res).toBeFalsy();
  });
  it('Eye Distance 120 test 8 ', async () => {
    faceLandmark.prediction = faceJson8;
    const res = faceLandmark.isDistance120px();
    expect(res).toBeTruthy();
  });
});
