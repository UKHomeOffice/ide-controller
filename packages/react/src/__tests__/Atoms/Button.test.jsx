// Global imports
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Local imports
import Button from '../../Components/Atoms/Button';

describe('<Button />', () => {
  it('renders and match the snapshot', () => {
    const onClick = jest.fn();
    const { asFragment } = render(
      <Button buttonVariant="secondary" disabled={false} onClick={onClick}>
        Test
      </Button>
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('calls onClick props when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    fireEvent.click(screen.getByTestId('atoms-button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop equals true', () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByTestId('atoms-button');

    expect(button).toBeDisabled();
  });

  it('has properly className', () => {
    render(<Button className="secondary">Click Me</Button>);
    const button = screen.getByTestId('atoms-button');

    expect(button).toHaveClass('govuk-button--secondary');
  });

  it('has properly text content', () => {
    const text = 'Click Me';
    render(<Button>{text}</Button>);
    const button = screen.getByTestId('atoms-button');

    expect(button).toHaveTextContent(text);
  });
});
