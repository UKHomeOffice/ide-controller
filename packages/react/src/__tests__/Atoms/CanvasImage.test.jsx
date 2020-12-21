// Global imports
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

// Local imports
import CanvasImage from '../../Components/Atoms/CanvasImage';

describe('<CanvasImage />', () => {
  const sourceImage = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  };

  const destinationImage = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  };

  const ref = {
    current: document.createElement('canvas'),
  };

  it('renders and match the snapshot', () => {
    const { asFragment } = render(
      <CanvasImage
        ref={ref}
        className="testClass"
        sourceImage={sourceImage}
        destinationImage={destinationImage}
      />
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('has className equals to className prop', () => {
    const className = 'testClass';
    render(<CanvasImage ref={ref} className={className} />);
    const canvas = screen.getByTestId('atoms-canvas-image');

    expect(canvas).toHaveClass(className);
  });

  it('width attribute equals to destinationImage width prop', () => {
    render(<CanvasImage ref={ref} destinationImage={destinationImage} />);
    const canvas = screen.getByTestId('atoms-canvas-image');

    expect(canvas).toHaveAttribute('width', String(destinationImage.width));
  });

  it('height attribute equals to destinationImage height prop', () => {
    render(<CanvasImage ref={ref} destinationImage={destinationImage} />);
    const canvas = screen.getByTestId('atoms-canvas-image');

    expect(canvas).toHaveAttribute('height', String(destinationImage.height));
  });
});
