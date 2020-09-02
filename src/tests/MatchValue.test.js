import React from 'react';
import { render } from '@testing-library/react';

import MatchValue from '../Components/MatchValue';

test('Checking text of Match Value component', () => {
  const { getByText } = render(<MatchValue />);

  const text = getByText(/Facial likeness between these photos/i);
  const res = getByText(/Pass 55%/i);

  expect(text).toBeInTheDocument();
  expect(res).toBeInTheDocument();
})