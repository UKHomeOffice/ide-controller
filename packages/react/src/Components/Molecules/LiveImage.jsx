// Global imports
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';

// Local imports
import {
  getCroppedImageCoordination,
  isGoodPicture,
} from '../../helpers/camera';
import { CanvasImage, CanvasRect, Video } from '../Atoms';
import { LivePhotoContext } from '../Context/LivePhoto';
import { ScoreContext } from '../Context';
import { logDataEvent } from '../../helpers/log';
import { createAndRotateCanvas } from '../../helpers/canvas';

// Config
import { livePhotoConfig } from '../../config/camera';

const rotatedCanvas = createAndRotateCanvas(
  livePhotoConfig.video.height,
  livePhotoConfig.video.width
);
const context = rotatedCanvas.getContext('2d');

const LiveImage = ({ cameraId }) => {
  const { setLivePhotoContext } = useContext(LivePhotoContext);
  const { setScoreContext } = useContext(ScoreContext);

  const canvasRef = useRef('canvas');
  const guidCanvasRef = useRef('guidCanvas');
  const videoRef = useRef();

  const [showVideo, setShowVideo] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [sourceImageOptions, setSourceImageOptions] = useState({});
  const [isGoodQuality, setIsGoodQuality] = useState(false);

  let imageQualityCounter = 0;

  const estimate = async () => {
    const isCameraOffline = !videoRef.current;
    if (isCameraOffline) return;

    context.drawImage(videoRef.current, 0, 0);

    const croppedImageCoordination = await getCroppedImageCoordination(
      rotatedCanvas
    );
    setSourceImageOptions(croppedImageCoordination);
    const syncedIsGoodQuality = isGoodPicture(croppedImageCoordination);
    setIsGoodQuality(syncedIsGoodQuality);
    imageQualityCounter = syncedIsGoodQuality ? imageQualityCounter + 1 : 0;

    if (imageQualityCounter < 10) {
      setTimeout(estimate, 50);
    } else {
      logDataEvent('Livephoto', 'Taken');
      videoRef.current.pause();
      setShowCanvas(true);
      setShowVideo(false);
      setLivePhotoContext({
        image: rotatedCanvas.toDataURL('image/jpeg'),
        timestamp: Date.now(),
      });
    }
  };

  useEffect(() => {
    videoRef.current.addEventListener('canplay', async () => {
      setTimeout(estimate, 1000);
    });
    setScoreContext({});
    logDataEvent('Livephoto', 'Initialised');
  }, []);

  return (
    <div className="live-image photoContainer--photo position-relative">
      {showVideo && (
        <>
          <Video
            ref={videoRef}
            cameraId={cameraId}
            captureOptions={livePhotoConfig}
            className="live-image__video"
          />
          <CanvasRect
            className="live-image__canvas position-absolute"
            ref={guidCanvasRef}
            isGoodQuality={isGoodQuality}
            width={livePhotoConfig.video.height}
            height={livePhotoConfig.video.width}
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
          className="position-absolute"
          sourceImage={{
            image: rotatedCanvas,
            x: sourceImageOptions.sourceX,
            y: sourceImageOptions.sourceY,
            width: sourceImageOptions.calculatedWidth,
            height: sourceImageOptions.calculatedHeight,
          }}
          ref={canvasRef}
          destinationImage={{
            width: livePhotoConfig.canvas.width,
            height: livePhotoConfig.canvas.height,
          }}
        />
      )}
    </div>
  );
};

export default LiveImage;

LiveImage.propTypes = {
  cameraId: PropTypes.string,
};

LiveImage.defaultProps = {
  cameraId: null,
};
