// Global imports
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';

// Local imports
import FaceLandmark, { loadModel } from '../../helpers/camera';
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

const smallRotatedCanvas = createAndRotateCanvas(
  livePhotoConfig.video.height / 2,
  livePhotoConfig.video.width / 2
);
const smallContext = smallRotatedCanvas.getContext('2d');

const LiveImage = ({ cameraId, className }) => {
  const { setLivePhotoContext } = useContext(LivePhotoContext);
  const { setScoreContext } = useContext(ScoreContext);

  const canvasRef = useRef('canvas');
  const guidCanvasRef = useRef('guidCanvas');
  const videoRef = useRef();

  const [showVideo, setShowVideo] = useState(true);
  const [sourceImageOptions, setSourceImageOptions] = useState({});
  const [isGoodQuality, setIsGoodQuality] = useState(false);
  const [loading, setLoading] = useState(true);

  let imageQualityCounter = 0;
  const goodImageMaxTake = 16;

  const estimate = async (faceLandmark) => {
    const isCameraOffline = !videoRef.current;
    if (isCameraOffline) return;

    smallContext.drawImage(
      videoRef.current,
      0,
      0,
      livePhotoConfig.video.width / 2,
      livePhotoConfig.video.height / 2
    );

    const croppedImageCoordination = await faceLandmark.getCroppedImageCoordination(
      smallRotatedCanvas,
      2
    );
    setSourceImageOptions(croppedImageCoordination);
    const syncedIsGoodQuality = faceLandmark.isGoodPicture();
    setIsGoodQuality(syncedIsGoodQuality);
    imageQualityCounter = syncedIsGoodQuality ? imageQualityCounter + 1 : 0;

    if (imageQualityCounter < goodImageMaxTake) {
      requestAnimationFrame(() => estimate(faceLandmark));
    } else if (imageQualityCounter >= goodImageMaxTake) {
      context.drawImage(videoRef.current, 0, 0);
      logDataEvent('LivePhoto', 'Taken');
      setShowVideo(false);
      setLivePhotoContext({
        image: canvasRef.current.toDataURL('image/jpeg'),
        timestamp: Date.now(),
      });
    }
  };

  useEffect(() => {
    videoRef.current.addEventListener('canplay', async () => {
      await loadModel();
      const faceLandmark = new FaceLandmark();
      await estimate(faceLandmark);
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
      <CanvasImage
        className="position-absolute"
        sourceImage={{
          image: rotatedCanvas,
          ...sourceImageOptions,
        }}
        ref={canvasRef}
        destinationImage={{
          width: livePhotoConfig.canvas.width,
          height: livePhotoConfig.canvas.height,
        }}
      />
      <Video
        ref={videoRef}
        cameraId={cameraId}
        captureOptions={livePhotoConfig}
        className={`live-image__video ${!showVideo && 'display-none'}`}
      />
      <CanvasRect
        className={`live-image__canvas position-absolute ${
          !showVideo && 'display-none'
        }`}
        ref={guidCanvasRef}
        isGoodQuality={isGoodQuality}
        width={livePhotoConfig.video.height}
        height={livePhotoConfig.video.width}
        coordinate={sourceImageOptions}
      />
      <LoadingOverlay show={loading} />
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
