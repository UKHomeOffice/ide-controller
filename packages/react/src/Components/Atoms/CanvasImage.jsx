// Global imports
import PropTypes from 'prop-types';
import React, { forwardRef, useEffect } from 'react';

// Local imports
import { isEmpty } from '../../helpers/common';
import { drawImage } from '../../helpers/canvas';

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
