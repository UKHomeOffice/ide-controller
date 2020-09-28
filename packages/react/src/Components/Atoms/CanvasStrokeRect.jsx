// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, forwardRef } from 'react';

// Local imports
import { isEmpty } from '../../helpers/common';

const CanvasStrokeRect = forwardRef(
  ({ strokeRectCoordinate, width, height, className }, canvasRef) => {
    const strokeRect = () => {
      if (isEmpty(canvasRef)) return;
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#2ea44f';
      ctx.lineWidth = 4;
      ctx.strokeRect(
        strokeRectCoordinate.x,
        strokeRectCoordinate.y,
        strokeRectCoordinate.width,
        strokeRectCoordinate.height
      );
    };
    useEffect(strokeRect, [strokeRectCoordinate]);

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
  strokeRectCoordinate: PropTypes.shape({
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
  strokeRectCoordinate: {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  },
  className: '',
};

export default CanvasStrokeRect;
