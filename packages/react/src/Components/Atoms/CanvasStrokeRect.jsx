// Global imports
import PropTypes from 'prop-types';
import React, { forwardRef, useEffect } from 'react';

// Local imports
import { isEmpty } from '../../helpers/common';

const paintRec = (context, coordinate, color = '#2ea44f') => {
  context.strokeStyle = color;
  context.lineWidth = 4;
  context.strokeRect(
    coordinate.x,
    coordinate.y,
    coordinate.width,
    coordinate.height
  );
};

const CanvasStrokeRect = forwardRef(
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

CanvasStrokeRect.propTypes = {
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

CanvasStrokeRect.defaultProps = {
  width: 100,
  height: 100,
  coordinate: {
    x: 0,
    y: 0,
    width: 100,
    heigh: 100,
  },
  className: '',
};

export default CanvasStrokeRect;
