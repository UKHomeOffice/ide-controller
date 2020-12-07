// Global imports
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

// Local imports
import CanvasRect from '../../Components/Atoms/CanvasRect';

describe('<CanvasRect />', () => {
  const ref = {
    current: document.createElement('canvas'),
  };

  const coordinate = {
    x: 0,
    y: 0,
    width: 100,
    heigh: 100,
  };

  it('renders and match the snapshot', () => {
    const { asFragment } = render(
      <CanvasRect
        ref={ref}
        width={100}
        height={100}
        className="testClassName"
        coordinate={coordinate}
      />
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('has className equals to passed className prop', () => {
    const className = 'testClass';
    render(<CanvasRect ref={ref} className={className} />);
    const canvas = screen.getByTestId('atoms-canvas-rect');

    expect(canvas).toHaveClass(className);
  });

  it('width attribute equals to width prop', () => {
    const width = 400;
    render(<CanvasRect ref={ref} width={width} />);
    const canvas = screen.getByTestId('atoms-canvas-rect');

    expect(canvas).toHaveAttribute('width', String(width));
  });

  it('height attribute equals to height prop', () => {
    const height = 800;
    render(<CanvasRect ref={ref} height={height} />);
    const canvas = screen.getByTestId('atoms-canvas-rect');

    expect(canvas).toHaveAttribute('height', String(height));
  });
});
