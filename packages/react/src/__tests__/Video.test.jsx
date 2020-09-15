// Global imports
import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

// Local imports
import Video from '../Components/Video';

describe('<Video />', () => {
  afterEach(cleanup);
  it('renders and matches the snapshot', async () => {
    const promise = Promise.resolve();
    global.navigator.mediaDevices = {
      getUserMedia: jest.fn(() => promise),
    };

    const captureOptions = {
      video: {
        width: 100,
        height: 100,
      },
    };
    const ref = jest.fn(() => ({
      current: {},
    }));
    const { asFragment } = render(
      <Video ref={ref} captureOptions={captureOptions} />
    );

    expect(asFragment).toMatchSnapshot();
    await act(() => promise);
  });
});
