import * as tf from '@tensorflow/tfjs'; // eslint-disable-line
import * as posenet from '@tensorflow-models/posenet';

export const ResPosenet = async (width, height) => {
  const net = await posenet.load({
    architecture: 'ResNet50',
    outputStride: 16,
    inputResolution: {
      width,
      height,
    },
    quantBytes: 2,
  });

  return net;
};

export default {
  ResPosenet,
};
