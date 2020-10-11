// Global imports
import * as tf from '@tensorflow/tfjs'; // eslint-disable-line
import * as posenet from '@tensorflow-models/posenet';

// Local imports
import { livePhotoConfig } from '../config/camera';

const {
  video,
  zoomFactor: defaultZoomFactor,
  threshold: defaulThreshold,
  imageResolution,
} = livePhotoConfig;

let net;
let keypoints;

/*
 * tfjs-models
 * https://github.com/tensorflow/tfjs-models/tree/master/posenet
 */
const loadPosenet = () =>
  posenet.load({
    architecture: 'ResNet50',
    outputStride: 32,
    multiplier: 1,
    quantBytes: 1,
  });

export const estimateSinglePose = async (frame) => {
  if (!net) net = await loadPosenet();
  /* parameter(imageSource, imageScaleFactor, flipHorizontal, outputStride) */
  return net.estimateSinglePose(frame, 0.5, false, 16);
};

export const getCameraDevices = async () => {
  return (await navigator.mediaDevices.enumerateDevices())
    .filter((device) => device.kind === 'videoinput')
    .map((device) => ({
      label: device.label,
      deviceId: device.deviceId,
    }));
};

export const isBelowThreshold = (threshold = defaulThreshold) => {
  if (!keypoints) return true;
  return !!keypoints.slice(0, 5).find((poseItem) => poseItem.score < threshold);
};

const isAboveThreshold = (threshold = defaulThreshold) =>
  !isBelowThreshold(threshold);
const videoRatio = video.width / video.height;
const isGoodRatio = ({ width, height }) => {
  return width / height === videoRatio;
};
const isGoodResolution = (width) => {
  const resolutionPercentage = Math.round((width / video.width) * 100);
  return resolutionPercentage > imageResolution;
};

export const isGoodPicture = ({ width, height }) => {
  return (
    isAboveThreshold() &&
    isGoodRatio({ width, height }) &&
    isGoodResolution(width)
  );
};

const calculateMargin = ({ leftEar, rightEar }, zoomFactor) => {
  /* 5 is an arbitrary number to divide the face into sections  */
  const faceVerticalDivisions = 5;
  let margin = ((leftEar.x - rightEar.x) / faceVerticalDivisions) * 2;
  margin *= zoomFactor;

  return margin;
};

const extractKeypointsPosition = () => ({
  nose: keypoints[0].position,
  leftEar: keypoints[3].position,
  rightEar: keypoints[4].position,
});

const calculateCoordination = ({ nose, leftEar, rightEar }, zoomFactor) => {
  const margin = calculateMargin({ leftEar, rightEar }, zoomFactor);
  const ratio = video.height / video.width;
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

export const getCroppedImageCoordination = async (
  frame,
  zoomFactor = defaultZoomFactor
) => {
  keypoints = (await estimateSinglePose(frame)).keypoints;
  const keypointsPosition = extractKeypointsPosition();
  return calculateCoordination(keypointsPosition, zoomFactor);
};

export default {};
