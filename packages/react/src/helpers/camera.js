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
    }
  );
};

class FaceLandmark {
  constructor() {
    this.prediction = {};
    this.croppedImageCoordination = {};
    this.printed = true;
  }

  async getCroppedImageCoordination(stream, zoomFactor = defaultZoomFactor) {
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
      sourceX: noseTip[0][0] - width / 2,
      sourceY: midwayBetweenEyes[0][1] - height / 2,
      calculatedWidth: width,
      calculatedHeight: height,
    };

    if (this.printed) {
      this.printed = false;
    }

    return this.croppedImageCoordination;
  }

  isGoodResolution() {
    const { calculatedWidth } = this.croppedImageCoordination;
    const resolutionPercentage = Math.round(
      (calculatedWidth / video.height) * 100
    );
    return resolutionPercentage > imageResolution;
  }

  isFaceCentered() {
    const { midwayBetweenEyes, noseTip } = this.prediction.annotations;
    const difference = midwayBetweenEyes[0][0] - noseTip[0][0];
    return difference < 4 && difference > -4;
  }

  isDistance120px() {
    const { leftEyeIris, rightEyeIris } = this.prediction.annotations;
    return leftEyeIris[0][0] - rightEyeIris[0][0] > 120;
  }

  isInsideFrame() {
    const {
      sourceX,
      sourceY,
      calculatedWidth,
      calculatedHeight,
    } = this.croppedImageCoordination;

    const isYInsideFrame =
      sourceY >= 0 && sourceY + calculatedHeight < video.width;
    const isXInsideFrame =
      sourceX >= 0 && sourceX + calculatedWidth < video.height;
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
