import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { TestContext } from 'react-admin';
import App from './App';

describe('webapp/components/App/App', () => {
  test('renders login upon initialization', async () => {
    const screen = render(<App />);

    const container = await waitForElement(() => {
      return screen.container;
    }, { container: screen.container });

    expect(screen.getByText(/Sign in/)).toBeInTheDocument();
  });
});
