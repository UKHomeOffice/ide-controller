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
import { ScoreContext } from '../Context';
import { Column } from '../Layout';
import ImageCard from './ImageCard';
import { sendToElectronStore } from '../../helpers/ipcMainEvents';

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
    console.log('estimage');
    const isCameraOffline = !videoRef.current;
    // let interval;
    console.log('isCameraOffline ', isCameraOffline);
    // if (isCameraOffline) {
    //   interval = setInterval(() => estimate(), 2000);
    //   return;
    // }
    setInterval(() => estimate(), 2000);
    // clearInterval(interval);
    console.log('before TF');
    const croppedImageCoordination = await getCroppedImageCoordination(
      videoRef.current
    );
    console.log('after TF');
    setSourceImageOptions(croppedImageCoordination);
    console.log('before Quality check');
    const isBadQuality = !isGoodPicture(croppedImageCoordination);
    console.log('isBadQuality ', isBadQuality);
    if (isBadQuality) {
      console.log('try again ');
      setTimeout(() => estimate(), 50);
    } else {
      sendToElectronStore('Livephoto', 'Taken');
      videoRef.current.pause();
      setShowCanvas(true);
      setShowVideo(false);
      setLivePhotoContext({
        image: canvasRef.current.toDataURL('image/jpeg'),
        timestamp: Date.now(),
      });
    }
  };

  useEffect(() => {
    videoRef.current.addEventListener('canplay', async () => {
      estimate();
    });
    setScoreContext({});
    sendToElectronStore('Livephoto', 'Initialised');
  }, []);

  return (
    <Column size="one-third">
      <ImageCard className="position-relative">
        {showVideo && (
          <>
            <Video
              ref={videoRef}
              cameraId={cameraId}
              captureOptions={livePhotoConfig}
              className="photoContainer--photo"
            />
            <CanvasRect
              className="photoContainer--photo position-absolute"
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
            className="photoContainer--photo"
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
