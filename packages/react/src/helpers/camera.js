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
      modelUrl: './Model/facemesh/model.json',
      irisModelUrl: './Model/iris/model.json',
      detectorModelUrl: './Model/blaze/model.json',
    }
  );
};

class FaceLandmark {
  constructor() {
    this.prediction = {};
    this.croppedImageCoordination = {};
    this.printed = true;
  }

  async getCroppedImageCoordination(
    stream,
    multiplier = 1,
    zoomFactor = defaultZoomFactor
  ) {
    [this.prediction] = await model.estimateFaces({ input: stream });

    if (!this.prediction) return {};

    /* 
    This used to be calculated dynamically like this 👇
    const ratio = video.height / video.width;
    But now because the image is rotated and part of it is hidden, we just calculate the visible box ratio 
    To get the dimensions go to variables.scss and look for $live-image-width & $live-image-height
    To calculate the ratio  = $live-image-height / $live-image-width
    currently 617.5 / 405 = 1.525
    */
    const ratio = 1.525;
    const { bottomRight, topLeft } = this.prediction.boundingBox;
    const { noseTip, midwayBetweenEyes } = this.prediction.annotations;

    const width = bottomRight[0] - topLeft[0] * zoomFactor;
    const height = width * ratio;

    this.croppedImageCoordination = {
      // sourceX, sourceY, calculatedWidth, calculatedHeight
      x: (noseTip[0][0] - width / 2) * 3,
      y: (midwayBetweenEyes[0][1] - height / 2) * multiplier,
      width: width * multiplier,
      height: height * multiplier,
    };

    return this.croppedImageCoordination;
  }

  isGoodResolution() {
    const { width } = this.croppedImageCoordination;
    const resolutionPercentage = Math.round((width / video.height) * 100);
    return resolutionPercentage > imageResolution;
  }

  isFaceCentered() {
    const { midwayBetweenEyes, noseTip } = this.prediction.annotations;
    const difference = midwayBetweenEyes[0][0] - noseTip[0][0];
    return difference < 4 && difference > -4;
  }

  isDistance120px() {
    const { leftEyeIris, rightEyeIris } = this.prediction.annotations;
    return leftEyeIris[0][0] - rightEyeIris[0][0] > 40;
  }

  isInsideFrame() {
    const { x, y, width, height } = this.croppedImageCoordination;

    const isYInsideFrame = y >= 0 && y + height < video.width;
    const isXInsideFrame = x >= 0 && x + width < video.height;
    return isYInsideFrame && isXInsideFrame;
  }

  isAboveThreshold(threshold = defaulThreshold) {
    return this.prediction?.faceInViewConfidence >= threshold;
  }

  isGoodPicture() {
    return (
      this.isAboveThreshold() &&
      this.isInsideFrame() &&
      this.isGoodResolution() &&
      this.isFaceCentered() &&
      this.isDistance120px()
    );
  }
}

export default FaceLandmark;

// const isEyesOpen = () => {
//   const { mesh } = prediction;
//   if (Math.abs(mesh[386][1] - mesh[374][1]) < 3) {
//     return false;
//   }
//   if (Math.abs(mesh[159][1] - mesh[145][1]) < 3) {
//     return false;
//   }
//   return true;
// };
//
// const isEyeLookAtCamera = () => {
//   const mesh = prediction.scaledMesh;
//   const { annotations } = prediction;
//   const [leftX] = annotations.leftEyeIris[0];
//   const leftEyeL = Math.abs(leftX - mesh[263][0]);
//   const leftEyeR = Math.abs(leftX - mesh[362][0]);
//   const [rightX] = annotations.rightEyeIris[0];
//   const error = 0.2;
//   return leftEyeL / leftEyeR <= 1 + error && leftEyeL / leftEyeR >= 1 - error;
//
// };
//
// const isFaceStraight = () => {
//   const keypoints = prediction.scaledMesh;
//   const { annotations } = prediction;
//   const [topX, topY, topZ] = annotations.midwayBetweenEyes[0];
//   const [leftEyeX, leftEyeY, leftEyeZ] = annotations.leftEyeIris[0];
//   const [rightEyeX, rightEyeY] = annotations.rightEyeIris[0];
//   const [r1, r, noseTipZ] = annotations.noseTip[0];
//   const ted = Math.abs(topX - leftEyeX) / Math.abs(topX - rightEyeX);
//   const error = 0.2;
//   let minZ = 9999;
//   let maxZ = -9999;
//   for (let i = 0; i < keypoints.length; i++) {
//     const z = keypoints[i][2];
//     minZ = Math.min(z, minZ);
//     maxZ = Math.max(z, maxZ);
//   }
//   return (
//     ted < 1 + error && ted > 1 - error && leftEyeZ >= minZ && noseTipZ <= maxZ
//   );
// };
//
// export const isEyeDistanceAcceptable = (prediction) => {
//   const { annotations } = prediction;
//   const [rightX] = annotations.rightEyeIris[0];
//   const [leftX] = annotations.leftEyeIris[0];
//   return Math.abs(rightX - leftX) >= 40;
// };
//
// const isMouthClosed = () => {
//   const { mesh } = prediction;
//   return !(Math.abs(mesh[13][1] - mesh[14][1]) > 2.5);
// };
