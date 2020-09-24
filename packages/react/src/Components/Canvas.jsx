import React, { useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Canvas = forwardRef(
  (
    { options, sourceImage, sourceImageOptions, destinationImageOptions },
    canvasRef
  ) => {
    const updateCanvas = () => {
      if (!sourceImage) return;
      const ctx = canvasRef.current.getContext('2d');
      // Check parameter options from https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
      ctx.drawImage(
        sourceImage,
        sourceImageOptions.sx,
        sourceImageOptions.sy,
        sourceImageOptions.sWidth,
        sourceImageOptions.sHeight,
        destinationImageOptions.dx,
        destinationImageOptions.dy,
        options.video.width,
        options.video.height
      );
    };
    useEffect(updateCanvas, [sourceImage]);
    return (
      <canvas
        ref={canvasRef}
        width={options.video.width}
        height={options.video.height}
      />
    );
  }
);

Canvas.propTypes = {
  options: PropTypes.shape({
    video: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }),
  sourceImage: PropTypes.shape({}),
  sourceImageOptions: PropTypes.shape({
    sx: PropTypes.number,
    sy: PropTypes.number,
    sWidth: PropTypes.number,
    sHeight: PropTypes.number,
  }),
  destinationImageOptions: PropTypes.shape({
    dx: PropTypes.number,
    dy: PropTypes.number,
  }),
};

Canvas.defaultProps = {
  sourceImage: {},
  options: {
    video: {
      width: 100,
      height: 450,
    },
  },
  sourceImageOptions: {
    sx: 0,
    sy: 0,
    sWidth: 100,
    sHeight: 450,
  },
  destinationImageOptions: {
    dx: 0,
    dy: 0,
  },
};

export default Canvas;
