// Global imports
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
    modelUrl: './model-stride32.json',
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

const isBelowThreshold = (threshold = defaulThreshold) => {
  if (!keypoints) return true;
  return !!keypoints.slice(0, 5).find((poseItem) => poseItem.score < threshold);
};

const isAboveThreshold = (threshold = defaulThreshold) =>
  !isBelowThreshold(threshold);

const isGoodRatio = ({
  sourceX,
  sourceY,
  calculatedWidth,
  calculatedHeight,
}) => {
  const isYInsideFrame =
    sourceY >= 0 && sourceY + calculatedHeight < video.width;
  const isXInsideFrame =
    sourceX >= 0 && sourceX + calculatedWidth < video.height;
  return isYInsideFrame && isXInsideFrame;
};

const isGoodResolution = (width) => {
  const resolutionPercentage = Math.round((width / video.height) * 100);
  return resolutionPercentage > imageResolution;
};

export const isGoodPicture = (croppedImageCoordination) => {
  return (
    isAboveThreshold() &&
    isGoodRatio(croppedImageCoordination) &&
    isGoodResolution(croppedImageCoordination.calculatedWidth)
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
  /* 
  This used to be calculated dynamically like this 👇
  const ratio = video.height / video.width;
  But now because the image is rotated and part of it is hidden, we just calculate the visible box ratio 
  To get the dimensions go to variables.scss and look for $live-image-width & $live-image-height
  To calculate the ratio  = $live-image-height / $live-image-width
  */
  const ratio = 1.525;
  const xOneSideMargin = margin / 2;
  const xStart = Math.floor(rightEar.x) - xOneSideMargin;
  const xEnd = Math.ceil(leftEar.x) + xOneSideMargin;
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
