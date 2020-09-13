import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('admin-panel/components/App/App', () => {
  it('renders', () => {
    const {container} = render(<App/>);

    expect(container?.firstChild).toHaveClass('App')
  });
});
