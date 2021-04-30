// Global imports
/* Tensor Flow JS (not used in this file) is required by @tensorflow-models/posenet library */
// eslint-disable-next-line
import * as ts from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

// eslint-disable-next-line
import * as backendWebgl from '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

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
let prediction;
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

/* Creates posenet singelton */
export const estimateSinglePose = async (frame) => {
  if (!net) net = await loadPosenet();
  /* parameter(imageSource, imageScaleFactor, flipHorizontal, outputStride) */
  return net.estimateSinglePose(frame, 0.5, false, 16);
};

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

/**
 *  3- check if the frame is good to use 👇
 *    a) isEyesOpen
 *    b) isFaceStraight
 *    c) isEyesLookingAtCamera
 *    b) isMouthClosed
 */

const isEyesOpen = () => {
  const mesh = prediction .mesh ;
  if (Math.abs(mesh[386][1] - mesh[374][1] ) < 3 ){
    // LEFT
    return false ;
  }else if (Math.abs(mesh[159][1] - mesh[145][1] ) < 3 ){
   // Right
   return false;
  }
  return true;
}

const isFaceStraight = () => {
  const  annotations  = prediction.annotations;
  const [topX, topY , topZ ] = annotations.midwayBetweenEyes[0];
  const [leftEyeX , leftEyeY , leftEyeZ] = annotations.leftEyeIris[0];
  const [rightEyeX , rightEyeY] = annotations.rightEyeIris[0];
  const [r1 , r , noseTipZ] = annotations.noseTip[0];
  const ted =(Math.abs(topX - leftEyeX)  / Math.abs (topX - rightEyeX));
  const error = 0.2 ;
  let minZ = 9999 ;
  let maxZ = -9999 ;

  return !(!(ted < 1 + error && ted > 1 - error && leftEyeZ >= minZ  && noseTipZ <= maxZ  ));
}
const isMouthClosed = () => {
  const mesh = prediction .mesh ;
  return ! (4 < Math.abs(mesh[13][1] - mesh[14][1]) ) ; 
}

export const isGoodPicture = (croppedImageCoordination  ) => {
  if (!prediction)
    return false;
  const isBelowThreshold = (threshold = defaulThreshold) => {
    if (!keypoints) return true;
    return !!keypoints
      .slice(0, 5)
      .find((poseItem) => poseItem.score < threshold);
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

  return (
    isFaceStraight(prediction) && 
    isEyesOpen(prediction) && 
    isMouthClosed(prediction) /*&& 
    
    isAboveThreshold() &&
    isGoodRatio(croppedImageCoordination) &&
    isGoodResolution(croppedImageCoordination.calculatedWidth)*/
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

const calculateLiveImageCoordination = (
  { nose, leftEar, rightEar },
  zoomFactor
) => {
  const margin = calculateMargin({ leftEar, rightEar }, zoomFactor);
  /* 
  This used to be calculated dynamically like this 👇
  const ratio = video.height / video.width;
  But now because the image is rotated and part of it is hidden, we just calculate the visible box ratio 
  To get the dimensions go to variables.scss and look for $live-image-width & $live-image-height
  To calculate the ratio  = $live-image-height / $live-image-width
  */

  // 617.5 / 405
  const ratio = 1.525;
  const xOneSideMargin = margin / 2;
  const xStart = Math.floor(rightEar.x) - xOneSideMargin;
  const xEnd = Math.ceil(leftEar.x) + xOneSideMargin;
  const sWidth = xEnd - xStart;
  const sHeight = sWidth * ratio;
  let yStart = Math.floor(nose.y) - sHeight / 1.7;
  yStart = yStart > 0 ? yStart : 0;

  return {
    sourceX: xStart,
    sourceY: yStart,
    calculatedWidth: sWidth,
    calculatedHeight: sHeight,
  };
};

const calculateLiveImageCoordinationLandMarkModel = (
 
) => {
  console.log(prediction)
  const boindingBox = prediction.boundingBox;

  const sWidth = Math.abs(boindingBox.topLeft[0] - boindingBox.bottomRight[0]); 
  const sHeight = Math.abs(boindingBox.topLeft[1] - boindingBox.bottomRight[1]);
  return {
    sourceX: boindingBox.topLeft[0],
    sourceY: boindingBox.topLeft[1],
    calculatedWidth: sWidth,
    calculatedHeight: sHeight,
  };
};
let model = null;
async function estimateSinglePose2(frame) {
  // Load the MediaPipe Facemesh package if it does not exists.
  if (!model) {
    model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
  }
  const predictions = await model.estimateFaces({
    input: frame,
  });

  if (predictions.length > 0) {
    /*
      1- If there're multiple faces get the closest to the camera
    */
   // console.log(predictions[0]);
    return predictions[0];
  }

  return null;
}

export const getCroppedImageCoordination = async (
  frame,
  zoomFactor = defaultZoomFactor
) => {
  /**  use pose model
  keypoints = (await estimateSinglePose(frame)).keypoints; 
  const keypointsPosition = extractKeypointsPosition(); 
  return calculateLiveImageCoordination(keypointsPosition, zoomFactor);*/

  /**
   * 2- use the new function estimateSinglePose2 to get keypointsPosition
   */ 
  
 prediction = await estimateSinglePose2(frame); 
  return  (prediction) ?  calculateLiveImageCoordinationLandMarkModel() : {};
};

export default {};
