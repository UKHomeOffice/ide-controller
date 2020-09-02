import React from 'react';
import { render } from '@testing-library/react';

import PhotoHeaders from '../Components/PhotoHeaders';

test('Checking text render of Photo Headers component', () => {
  const { getByText } = render(<PhotoHeaders />);

  const header1 = getByText(/Chip Photo/i);
  const header2 = getByText(/Document Photo/i);
  const header3 = getByText(/Live Photo/i);

  expect(header1).toBeInTheDocument();
  expect(header2).toBeInTheDocument();
  expect(header3).toBeInTheDocument();
})