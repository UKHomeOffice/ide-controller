export const drawImage = (context, sourceImage, destinationImage) => {
  /* Check parameter options from https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage */
  context.drawImage(
    sourceImage.image,
    sourceImage.x || 0,
    sourceImage.y || 0,
    sourceImage.width,
    sourceImage.height,
    destinationImage.x || 0,
    destinationImage.y || 0,
    destinationImage.width,
    destinationImage.height
  );
};

export const paintRec = (context, coordinate, color = '#cb2431') => {
  context.strokeStyle = color;
  context.lineWidth = 8;
  context.strokeRect(
    coordinate.x,
    coordinate.y,
    coordinate.width,
    coordinate.height
  );
};

export const createAndRotateCanvas = (width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.translate(width, 0);
  context.rotate(Math.PI / 2);

  return canvas;
};

export default {};
