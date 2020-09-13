import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders App component', () => {
  const screen = render(<Dashboard />);

  expect(screen.getByText(/Welcome to Bars/)).toBeInTheDocument();
});
