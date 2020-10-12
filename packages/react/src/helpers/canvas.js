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

export default {};
