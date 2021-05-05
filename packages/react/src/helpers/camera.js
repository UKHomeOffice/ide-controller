// Global imports
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
/* Tensor Flow JS (not used in this file) is required by @tensorflow-models/posenet library */
// eslint-disable-next-line
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

// Local imports
import { livePhotoConfig } from '../config/camera';

const {
  video,
  zoomFactor: defaultZoomFactor,
  threshold: defaulThreshold,
  imageResolution,
} = livePhotoConfig;

let prediction;
let model;

export const getCameraDevices = async () => {
  const enumerateDevices = await navigator.mediaDevices?.enumerateDevices();

  return enumerateDevices
    ?.filter((device) => device.kind === 'videoinput')
    .map((device) => ({
      label: device.label,
      deviceId: device.deviceId,
    }));
};

const isGoodResolution = (width) => {
  const resolutionPercentage = Math.round((width / video.height) * 100);
  return resolutionPercentage > imageResolution;
};

export const isGoodPicture = (croppedImageCoordination) => {
  const isAboveThreshold = (threshold = defaulThreshold) =>
    prediction?.faceInViewConfidence > threshold;

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

  return (
    isAboveThreshold() &&
    isGoodRatio(croppedImageCoordination) &&
    isGoodResolution(croppedImageCoordination.calculatedWidth)
  );
};

/*
 * tfjs-models
 * https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection
 * Creates MediaPipe Facemesh singleton
 */
export const loadModel = async () => {
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    {
      shouldLoadIrisModel: true,
      maxFaces: 1,
      iouThreshold: 0,
      scoreThreshold: 0.95,
      // flipHorizontal: true,
    }
  );
};

export const getCroppedImageCoordination = async (
  stream,
  zoomFactor = defaultZoomFactor
) => {
  prediction = {};
  const predictions = await model.estimateFaces({ input: stream });
  [prediction] = predictions;

  if (!prediction) return {};

  /* 
  This used to be calculated dynamically like this 👇
  const ratio = video.height / video.width;
  But now because the image is rotated and part of it is hidden, we just calculate the visible box ratio 
  To get the dimensions go to variables.scss and look for $live-image-width & $live-image-height
  To calculate the ratio  = $live-image-height / $live-image-width
  currently 617.5 / 405 = 1.525
  */
  const ratio = 1.525;
  const { bottomRight, topLeft } = prediction.boundingBox;
  const { noseTip, midwayBetweenEyes } = prediction.annotations;

  const width = bottomRight[0] - topLeft[0] * zoomFactor;
  const height = width * ratio;

  return {
    sourceX: noseTip[0][0] - width / 2,
    sourceY: midwayBetweenEyes[0][1] - height / 2,
    calculatedWidth: width,
    calculatedHeight: height,
  };
};

export default {};
