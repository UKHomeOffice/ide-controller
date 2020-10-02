// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

// Local imports
import { livePhotoConfig } from '../config/cameraOptions';
import {
  getDestinationImageCoordination,
  isBelowThreshold,
  ResPosenet,
} from '../helpers/camera';
import CanvasImage from './Atoms/CanvasImage';
import CanvasStrokeRect from './Atoms/CanvasStrokeRect';
import './Atoms/style.scss';
import './Controller.scss';
import { Column } from './Layout';
import ImageCard from './Molecules/ImageCard';
import { withContext } from './Context';
import Video from './Atoms/Video';

const LiveImage = ({ deviceId, value }) => {
  const canvasRef = useRef('canvas');
  const guidCanvasRef = useRef('guidCanvas');
  const videoRef = useRef();
  const [showVideo, setShowVideo] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [sourceImageOptions, setSourceImageOptions] = useState({});

  const estimate = async (net) => {
    const isCameraOffline = !videoRef.current;
    if (isCameraOffline) return;
    /* parameter(imageSource, imageScaleFactor, flipHorizontal, outputStride) */
    const { keypoints } = await net.estimateSinglePose(
      videoRef.current,
      0.5,
      false,
      16
    );
    const destinationImageCoordinations = getDestinationImageCoordination(
      keypoints
    );
    setSourceImageOptions(destinationImageCoordinations);
    if (isBelowThreshold(keypoints)) {
      estimate(net);
    } else {
      const { context, setContext } = value;
      setContext({
        imgae: videoRef.current,
        ...context,
      });
      videoRef.current.pause();
      setShowCanvas(true);
      setShowVideo(false);
    }
  };

  const initResPosenet = async () => {
    if (!videoRef.current) return;
    const net = await ResPosenet();
    estimate(net);
  };

  useEffect(() => {
    videoRef.current.addEventListener('canplay', initResPosenet);
  }, [videoRef]);

  return (
    <Column size="one-third" className="padding-5 position-relative">
      <ImageCard>
        {showVideo && (
          <>
            <Video
              ref={videoRef}
              deviceId={deviceId}
              captureOptions={livePhotoConfig}
            />
            <CanvasStrokeRect
              className="position-absolute"
              ref={guidCanvasRef}
              width={livePhotoConfig.video.width}
              height={livePhotoConfig.video.height}
              coordinate={{
                x: sourceImageOptions.sourceX,
                y: sourceImageOptions.sourceY,
                width: sourceImageOptions.calculatedWidth,
                height: sourceImageOptions.calculatedHeight,
              }}
            />
          </>
        )}
        {showCanvas && (
          <CanvasImage
            sourceImage={{
              image: videoRef.current,
              x: sourceImageOptions.sourceX,
              y: sourceImageOptions.sourceY,
              width: sourceImageOptions.calculatedWidth,
              height: sourceImageOptions.calculatedHeight,
            }}
            ref={canvasRef}
            destinationImage={{
              x: 0,
              y: 0,
              width: livePhotoConfig.video.width,
              height: livePhotoConfig.video.height,
            }}
          />
        )}
      </ImageCard>
    </Column>
  );
};

export default withContext(LiveImage);

LiveImage.propTypes = {
  deviceId: PropTypes.string,
  value: PropTypes.shape({
    context: PropTypes.shape({}),
    setContext: PropTypes.func,
  }),
};

LiveImage.defaultProps = {
  deviceId: null,
  value: {},
};
