// Global imports
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Local imports
import Tag from '../../Components/Atoms/Tag';

describe('<Tag />', () => {
  it('renders and match the snapshot', () => {
    const { asFragment } = render(
      <Tag tagText="tagText" tagStatus="neutral" />
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('has text content as tagText', () => {
    const tagText = 'testTag';
    render(<Tag tagText={tagText} tagStatus="neutral" />);
    const tag = screen.getByTestId('atoms-tag');

    expect(tag).toHaveTextContent(tagText);
  });

  it('has className depended on tagStatus prop', () => {
    const testStatus = 'neutral';
    render(<Tag tagText="testTag" tagStatus={testStatus} />);
    const tag = screen.getByTestId('atoms-tag');

    expect(tag).toHaveClass(`bg--${testStatus}`);
  });
});
