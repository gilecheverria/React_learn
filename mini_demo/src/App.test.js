import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  //render(<App />);
  render(<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>);
  const linkElement = screen.getByText(/Login Page/i);
  expect(linkElement).toBeInTheDocument();
});
