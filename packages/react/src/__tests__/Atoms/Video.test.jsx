// Global imports
import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

describe('<Video />', () => {
  afterEach(cleanup);
  it('renders and matches the snapshot', async () => {
    window.require = jest.fn(() => ({
      ipcRenderer: { send: jest.fn() },
    }));
    window.HTMLMediaElement.prototype.play = jest.fn();

    const Video = (await import('../../Components/Atoms/Video')).default;
    const promise = Promise.resolve();
    global.navigator.mediaDevices = {
      getUserMedia: jest.fn(() => promise),
      enumerateDevices: jest.fn(() => Promise.resolve([])),
    };

    const captureOptions = {
      video: {
        width: 100,
        height: 100,
      },
    };
    const ref = {
      current: {},
    };
    const { asFragment } = render(
      <Video ref={ref} captureOptions={captureOptions} />
    );

    expect(asFragment).toMatchSnapshot();
    await act(() => promise);
  });
});
