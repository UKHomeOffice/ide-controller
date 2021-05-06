// Global imports
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';

// Local imports
import {
  loadModel,
  getCroppedImageCoordination,
  isGoodPicture,
} from '../../helpers/camera';
import { createAndRotateCanvas } from '../../helpers/canvas';
import { logDataEvent } from '../../helpers/log';
import { CanvasImage, CanvasRect, Video, LoadingOverlay } from '../Atoms';
import { ScoreContext } from '../Context';
import { LivePhotoContext } from '../Context/LivePhoto';

// Config
import { livePhotoConfig } from '../../config/camera';

const rotatedCanvas = createAndRotateCanvas(
  livePhotoConfig.video.height,
  livePhotoConfig.video.width
);
const context = rotatedCanvas.getContext('2d');

const LiveImage = ({ cameraId, className }) => {
  const { setLivePhotoContext } = useContext(LivePhotoContext);
  const { setScoreContext } = useContext(ScoreContext);

  const canvasRef = useRef('canvas');
  const guidCanvasRef = useRef('guidCanvas');
  const videoRef = useRef();

  const [showVideo, setShowVideo] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [sourceImageOptions, setSourceImageOptions] = useState({});
  const [isGoodQuality, setIsGoodQuality] = useState(false);
  const [loading, setLoading] = useState(true);

  let imageQualityCounter = 0;
  // this 👇	must be even number
  const goodImageMaxTake = 16;
  let goodImageCapture = null;

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

    if (!syncedIsGoodQuality) goodImageCapture = null;

    if (imageQualityCounter === goodImageMaxTake / 2) {
      goodImageCapture = rotatedCanvas.toDataURL('image/jpeg');
    }

    if (imageQualityCounter < goodImageMaxTake) {
      requestAnimationFrame(estimate);
    } else if (imageQualityCounter >= goodImageMaxTake) {
      logDataEvent('LivePhoto', 'Taken');
      setShowCanvas(true);
      setShowVideo(false);
      setLivePhotoContext({
        image: goodImageCapture,
        timestamp: Date.now(),
      });
    }
  };

  useEffect(() => {
    videoRef.current.addEventListener('canplay', async () => {
      await loadModel();
      await estimate();
      setLoading(false);
    });
    setScoreContext({});
    logDataEvent('LivePhoto', 'Initialised');
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`live-image photoContainer--photo position-relative ${className}`}
    >
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
          <LoadingOverlay show={loading} />
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
  className: PropTypes.string,
};

LiveImage.defaultProps = {
  cameraId: null,
  className: '',
};
