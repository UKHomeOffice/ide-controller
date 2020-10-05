export const drawImage = (context, sourceImage, destinationImage) => {
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

export const paintRec = (context, coordinate, color = '#2ea44f') => {
  context.strokeStyle = color;
  context.lineWidth = 4;
  context.strokeRect(
    coordinate.x,
    coordinate.y,
    coordinate.width,
    coordinate.height
  );
};

export default {};
