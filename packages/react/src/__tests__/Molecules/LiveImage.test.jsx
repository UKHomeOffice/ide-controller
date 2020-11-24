// Global imports
import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

// Local imports
import LiveImage from '../../Components/Molecules/LiveImage';
import { LivePhotoProvider } from '../../Components/Context/LivePhoto';
import { ScoreProvider } from '../../Components/Context/Score';
import { livePhotoConfig } from '../../config/camera';

jest.mock('../../helpers', () => ({
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
});
