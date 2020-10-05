// Global imports
import PropTypes from 'prop-types';
import React, { forwardRef, useEffect } from 'react';

// Local imports
import { isEmpty } from '../../helpers/common';
import { paintRec } from '../../helpers/canvas';

const CanvasRect = forwardRef(
  ({ coordinate, width, height, className }, canvasRef) => {
    const rePaintRec = () => {
      if (isEmpty(canvasRef)) return;
      const context = canvasRef.current.getContext('2d');
      context.clearRect(0, 0, width, height);
      paintRec(context, coordinate);
    };
    useEffect(rePaintRec, [coordinate]);

    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={className}
      />
    );
  }
);

CanvasRect.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  coordinate: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  className: PropTypes.string,
};

CanvasRect.defaultProps = {
  width: 100,
  height: 100,
  coordinate: {
    x: 0,
    y: 0,
    width: 100,
    heigh: 100,
  },
  className: null,
};

export default CanvasRect;
