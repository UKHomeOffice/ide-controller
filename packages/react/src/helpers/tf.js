// Global imports
import * as tf from '@tensorflow/tfjs'; // eslint-disable-line
import * as posenet from '@tensorflow-models/posenet';

// Local imports
import { livePhotoConfig } from '../config/cameraOptions';

export const ResPosenet = async (
  width = livePhotoConfig.video.width,
  height = livePhotoConfig.video.height
) => {
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

export const getCameraDevices = async () => {
  return (await navigator.mediaDevices.enumerateDevices())
    .filter((device) => device.kind === 'videoinput')
    .map((device) => ({
      label: device.label,
      deviceId: device.deviceId,
    }));
};

export const isBelowThreshold = (
  singlePose,
  threshold = livePhotoConfig.threshold
) =>
  !!singlePose.keypoints
    .slice(0, 5)
    .find((poseItem) => poseItem.score < threshold);

export const getSourceImageOptions = (
  { keypoints },
  zoomFactor = livePhotoConfig.zoomFactor
) => {
  const nose = keypoints[0].position;
  const leftEye = keypoints[1].position;
  const rightEye = keypoints[2].position;
  let margin = (nose.y - leftEye.y + (nose.y - rightEye.y)) / 2;
  margin *= zoomFactor;

  const xStart = Math.floor(keypoints[4].position.x);
  const xEnd = Math.ceil(keypoints[3].position.x);
  const sWidth = xEnd - xStart;
  const sHeight =
    sWidth * (livePhotoConfig.video.height / livePhotoConfig.video.width);
  const yNose = Math.floor(keypoints[4].position.y);
  const yStart = yNose - sHeight / 2;

  return {
    sx: xStart - margin,
    sy: yStart - margin,
    sWidth: sWidth + margin * 2,
    sHeight: sHeight + margin * 2,
  };
};

export default {
  ResPosenet,
};
