import React, { forwardRef } from 'react';

const Canvas = forwardRef(({ captureOptions }, canvasRef) => {
  return (
    <canvas
      ref={canvasRef}
      width={captureOptions.video.width}
      height={captureOptions.video.height}
    />
  );
});

export default Canvas;
