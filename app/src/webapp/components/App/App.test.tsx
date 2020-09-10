import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  const {baseElement, container} = render(<App/>);

  expect(container?.firstChild).toHaveClass('App')
});
