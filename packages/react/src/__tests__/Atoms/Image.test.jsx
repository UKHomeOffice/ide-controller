// Global imports
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Local imports
import Image from '../../Components/Atoms/Image';
import { blankAvatar } from '../../images';

describe('<Image />', () => {
  it('renders and match the snapshot', () => {
    const { asFragment } = render(
      <Image imageAlt="testAlt" className="testClass" image={blankAvatar} />
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('has properly className', () => {
    render(<Image className="testClass" image={blankAvatar} />);
    const imageContainer = screen.getByTestId('atoms-image');

    expect(imageContainer).toHaveClass('testClass');
  });

  it('has properly alt attribute', () => {
    render(<Image imageAlt="test-alt" image={blankAvatar} />);
    const imageContainer = screen.getByTestId('atoms-image');

    expect(imageContainer).toHaveAttribute('alt', 'test-alt');
  });

  it('has properly background image', () => {
    const image = blankAvatar;
    render(<Image image={image} />);
    const imageContainer = screen.getByTestId('atoms-image');

    expect(imageContainer).toHaveStyle(`background-image: url(${image})`);
  });
});
