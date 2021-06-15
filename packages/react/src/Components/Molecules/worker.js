export default () => {
  self.addEventListener('message', (e) => {
    // eslint-disable-line no-restricted-globals
    if (!e) return;

    const canvas = e.data;
    // GET CANVAS CONTEXT
    const context = canvas.canvas.getContext('2d');

    // Init timer
    context.font = '15px Arial';
    context.clearRect(0, 0, 2000, 50);
    context.fillStyle = '#FFFFFF';
    context.fillText('Sorry, the system will stop ', 10, 20);
    context.fillText(' responding for a few seconds ...', 10, 38);

    let secondsLeft = 1;
    setInterval(() => {
      context.font = '15px Arial';
      context.clearRect(0, 0, 2000, 50);
      context.fillStyle = '#FFFFFF';
      context.fillText('Sorry, the system will stop ', 10, 20);
      context.fillText(
        ` responding for a few seconds ...${secondsLeft}`,
        10,
        38
      );
      secondsLeft += 1;
    }, 1000);

    // to return values to main thread
    postMessage('RRRRRRR');
  });
};
