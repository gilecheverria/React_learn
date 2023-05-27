/*
 * Integration test for the full App
 *
 * Gilberto Echeverria
 * 2022-08-18
 */

import { render, screen } from '@testing-library/react';
import App from './App';

describe('Conversion App', () => {

  // Check all components are rendered
  test('Render App', () => {
    render(<App />);
    const input = screen.getByTestId('inputForm')
    expect(input).toBeInTheDocument();
    const contents = screen.getByTestId('contents')
    expect(contents).toBeInTheDocument();
    const original = screen.getByTestId('tableOriginal')
    expect(original).toBeInTheDocument();
    const result = screen.getByTestId('tableResults')
    expect(result).toBeInTheDocument();
  });

  test('Conversion', () => {


  });

});
