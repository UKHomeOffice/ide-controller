// Global imports
import * as tf from '@tensorflow/tfjs'; // eslint-disable-line
import * as posenet from '@tensorflow-models/posenet';

// Local imports
import { livePhotoConfig } from '../config/camera';

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
  keypoints,
  threshold = livePhotoConfig.threshold
) => !!keypoints.slice(0, 5).find((poseItem) => poseItem.score < threshold);

const calculateMargin = ({ leftEar, rightEar }, zoomFactor) => {
  /* 5 is an arbitrary number to divide the face into sections  */
  const faceVerticalDivisions = 5;
  let margin = ((leftEar.x - rightEar.x) / faceVerticalDivisions) * 2;
  margin *= zoomFactor;

  return margin;
};

const extractKeypointsPosition = (keypoints) => ({
  nose: keypoints[0].position,
  leftEar: keypoints[3].position,
  rightEar: keypoints[4].position,
});

const calculateCoordination = ({ nose, leftEar, rightEar }, zoomFactor) => {
  const margin = calculateMargin({ leftEar, rightEar }, zoomFactor);
  const ratio = livePhotoConfig.video.height / livePhotoConfig.video.width;
  const xStart = Math.floor(rightEar.x) - margin / 2;
  const xEnd = Math.ceil(leftEar.x) + margin / 2;
  const sWidth = xEnd - xStart;
  const sHeight = sWidth * ratio;
  const yStart = Math.floor(nose.y) - sHeight / 1.7;

  return {
    sourceX: xStart,
    sourceY: yStart,
    calculatedWidth: sWidth,
    calculatedHeight: sHeight,
  };
};

export const getDestinationImageCoordination = (
  keypoints,
  zoomFactor = livePhotoConfig.zoomFactor
) => {
  const keypointsPosition = extractKeypointsPosition(keypoints);
  return calculateCoordination(keypointsPosition, zoomFactor);
};

export default {};
