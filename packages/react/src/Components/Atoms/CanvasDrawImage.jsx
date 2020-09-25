// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, forwardRef } from 'react';

// Local imports
import { isEmpty } from '../../helpers/common';

const CanvasDrawImage = forwardRef(
  ({ sourceImage, destinationImage }, canvasRef) => {
    const drawImage = () => {
      if (isEmpty(sourceImage)) return;
      const ctx = canvasRef.current.getContext('2d');
      // Check parameter options from https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
      ctx.drawImage(
        sourceImage.image,
        sourceImage.x,
        sourceImage.y,
        sourceImage.width,
        sourceImage.height,
        destinationImage.x,
        destinationImage.y,
        destinationImage.width,
        destinationImage.height
      );
    };

    useEffect(drawImage, [sourceImage]);
    return (
      <canvas
        ref={canvasRef}
        width={destinationImage.width}
        height={destinationImage.height}
      />
    );
  }
);

CanvasDrawImage.propTypes = {
  sourceImage: PropTypes.shape({
    image: PropTypes.shape({}),
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  destinationImage: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

CanvasDrawImage.defaultProps = {
  sourceImage: {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  },
  destinationImage: {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  },
};

export default CanvasDrawImage;
