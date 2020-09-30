// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, forwardRef } from 'react';

// Local imports
import { isEmpty } from '../../helpers/common';

const drawImage = (context, sourceImage, destinationImage) => {
  /* Check parameter options from https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage */
  context.drawImage(
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

const CanvasImage = forwardRef(
  ({ sourceImage, destinationImage }, canvasRef) => {
    useEffect(() => {
      if (isEmpty(sourceImage.image)) return;
      const context = canvasRef.current.getContext('2d');
      drawImage(context, sourceImage, destinationImage);
    }, [sourceImage]);

    return (
      <canvas
        ref={canvasRef}
        width={destinationImage.width}
        height={destinationImage.height}
      />
    );
  }
);

CanvasImage.propTypes = {
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

CanvasImage.defaultProps = {
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

export default CanvasImage;
