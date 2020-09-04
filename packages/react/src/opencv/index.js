import cv from './opencv';

const createFileFromUrl = (path, callback) => {
  const request = new XMLHttpRequest();
  request.open('GET', path, true);
  request.responseType = 'arraybuffer';
  request.onload = function (ev) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        const data = new Uint8Array(request.response);
        cv.FS_createDataFile('/', 'models.xml', data, true, false, false);
        callback();
      }
    }
  };
  request.send();
};

cv.init = (video, canvas) => {
  createFileFromUrl('haarcascade_frontalface_default.xml', () => {
    const src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    const dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    const gray = new cv.Mat();
    const cap = new cv.VideoCapture(video);
    const faces = new cv.RectVector();
    const classifier = new cv.CascadeClassifier();
    classifier.load('models.xml');

    const FPS = 30;
    const processVideo = () => {
      try {
        const begin = Date.now();
        cap.read(src);
        src.copyTo(dst);
        cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
        classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
        for (let i = 0; i < faces.size(); ++i) {
          const face = faces.get(i);
          const point1 = new cv.Point(face.x, face.y);
          const point2 = new cv.Point(
            face.x + face.width,
            face.y + face.height
          );
          if (video.width / 3 < face.width) {
            cv.rectangle(dst, point1, point2, [0, 200, 0, 100], 3);
          } else {
            cv.rectangle(dst, point1, point2, [255, 0, 0, 100], 3);
          }
        }
        cv.imshow(canvas, dst);
        const delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
      } catch (err) {
        console.log('error ', err);
      }
    };
    setTimeout(processVideo, 0);
  });
};

export default cv;
