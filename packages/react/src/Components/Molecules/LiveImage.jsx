// Global imports
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';

// Local imports
import { livePhotoConfig } from '../../config/camera';
import {
  getCroppedImageCoordination,
  isGoodPicture,
} from '../../helpers/camera';
import { CanvasImage, CanvasRect, Video } from '../Atoms';
import { LivePhotoContext } from '../Context/LivePhoto';
import { ScoreContext } from '../Context/Score';
import { Column } from '../Layout';
import ImageCard from './ImageCard';

const LiveImage = ({ cameraId }) => {
  const { setLivePhotoContext } = useContext(LivePhotoContext);
  const { setScoreContext } = useContext(ScoreContext);

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
    const isBadQuality = !isGoodPicture();
    if (isBadQuality) {
      setTimeout(() => estimate(), 50);
    } else {
      videoRef.current.pause();
      setShowCanvas(true);
      setShowVideo(false);
      setLivePhotoContext({
        image: canvasRef.current.toDataURL('image/jpeg'),
      });
    }
  };

  useEffect(() => {
    videoRef.current.addEventListener('canplay', async () => {
      estimate();
    });
    setScoreContext({});
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

export default LiveImage;

LiveImage.propTypes = {
  cameraId: PropTypes.string,
};

LiveImage.defaultProps = {
  cameraId: null,
};
