// Global imports
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

// Local imports
import LiveImage from '../../Components/Molecules/LiveImage';
import { LivePhotoProvider } from '../../Components/Context/LivePhoto';
import { ScoreProvider } from '../../Components/Context/Score';
import { livePhotoConfig } from '../../config/camera';

jest.mock('../../helpers/camera.js', () => ({
  getCroppedImageCoordination: jest.fn(() => ({})),
  isGoodPicture: jest.fn(() => true),
}));

const customRender = (ui) => {
  return render(
    <LivePhotoProvider value={{ setLivePhotoContext: jest.fn() }}>
      <ScoreProvider value={{ setScoreContext: jest.fn() }}>{ui}</ScoreProvider>
    </LivePhotoProvider>
  );
};

describe('<LiveImage />', () => {
  it('renders and match the snapshot', () => {
    const { asFragment } = customRender(<LiveImage cameraId="123" />);

    expect(asFragment).toMatchSnapshot();
  });

  it('Video is shown if showVideo is true', () => {
    customRender(<LiveImage cameraId="123" />);
    const video = screen.getByTestId('atoms-video');

    expect(video).toBeInTheDocument();
  });

  it('CanvasRect is shown if showVideo is true', () => {
    customRender(<LiveImage cameraId="123" />);
    const canvasRect = screen.getByTestId('atoms-canvas-rect');

    expect(canvasRect).toBeInTheDocument();
  });

  it('CanvasImage isnt shown if showCanvas is false', () => {
    customRender(<LiveImage cameraId="123" />);
    const canvasImage = screen.queryByTestId('atoms-canvas-image');

    expect(canvasImage).toBeNull();
  });

  it('Video width prop are equal to livePhotoConfig.video.width', () => {
    customRender(<LiveImage cameraIdId="123" />);
    const video = screen.getByTestId('atoms-video');

    expect(video).toHaveAttribute('width', String(livePhotoConfig.video.width));
  });

  it('Video height prop are equal to livePhotoConfig.video.width', () => {
    customRender(<LiveImage cameraIdId="123" />);
    const video = screen.getByTestId('atoms-video');

    expect(video).toHaveAttribute(
      'height',
      String(livePhotoConfig.video.height)
    );
  });

  it('Video renders properly className', () => {
    customRender(<LiveImage cameraIdId="123" />);
    const video = screen.getByTestId('atoms-video');

    expect(video).toHaveClass('live-image__video');
  });

  it('CanvasRect width prop are equal to livePhotoConfig.video.width', () => {
    customRender(<LiveImage cameraIdId="123" />);
    const rect = screen.getByTestId('atoms-canvas-rect');

    /* Note: useing livePhotoConfig.video.height only because we rotate the camera */
    expect(rect).toHaveAttribute('width', String(livePhotoConfig.video.height));
  });

  it('CanvasRect height prop are equal to livePhotoConfig.video.width', () => {
    customRender(<LiveImage cameraIdId="123" />);
    const rect = screen.getByTestId('atoms-canvas-rect');

    expect(rect).toHaveAttribute('height', String(livePhotoConfig.video.width));
  });

  it('CanvasRect renders properly className', () => {
    customRender(<LiveImage cameraIdId="123" />);
    const video = screen.getByTestId('atoms-canvas-rect');

    expect(video).toHaveClass('live-image__canvas position-absolute');
  });
});
