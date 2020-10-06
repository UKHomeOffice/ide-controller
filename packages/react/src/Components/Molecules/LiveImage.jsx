// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

// Local imports
import { livePhotoConfig } from '../../config/camera';
import {
  getCroppedImageCoordination,
  isBelowThreshold,
} from '../../helpers/camera';
import { CanvasRect, CanvasImage, Video } from '../Atoms';
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

  const estimate = async () => {
    const isCameraOffline = !videoRef.current;
    if (isCameraOffline) return;
    const croppedImageCoordination = await getCroppedImageCoordination(
      videoRef.current
    );
    setSourceImageOptions(croppedImageCoordination);
    if (isBelowThreshold()) {
      setTimeout(() => estimate(), 50);
    } else {
      const { context, setContext } = value;
      videoRef.current.pause();
      setShowCanvas(true);
      setShowVideo(false);
      setContext({
        ...context,
        image: canvasRef.current.toDataURL('image/jpeg'),
      });
    }
  };

  useEffect(() => {
    videoRef.current.addEventListener('canplay', async () => {
      estimate();
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
            <CanvasRect
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
