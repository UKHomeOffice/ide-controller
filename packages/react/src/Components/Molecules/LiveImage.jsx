// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

// Local imports
import { livePhotoConfig } from '../../config/camera';
import {
  getDestinationImageCoordination,
  isBelowThreshold,
  ResPosenet,
} from '../../helpers/camera';
import { CanvasStrokeRect, CanvasImage, Video } from '../Atoms';
import { Column } from '../Layout';
import ImageCard from './ImageCard';
import { withContext } from '../Context';

const LiveImage = ({ cameraId, value }) => {
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
      setTimeout(() => estimate(net), 200);
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

  useEffect(() => {
    videoRef.current.addEventListener('canplay', async () => {
      const net = await ResPosenet();
      estimate(net);
    });
  }, []);

  return (
    <Column size="one-third" className="padding-5 position-relative">
      <ImageCard>
        {showVideo && (
          <>
            <Video
              ref={videoRef}
              cameraId={cameraId}
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
  cameraId: PropTypes.string,
  value: PropTypes.shape({
    context: PropTypes.shape({}),
    setContext: PropTypes.func,
  }),
};

LiveImage.defaultProps = {
  cameraId: null,
  value: {},
};
