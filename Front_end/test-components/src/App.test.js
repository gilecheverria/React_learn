/*
 * Integration test for the whole application
 * From:
 * https://www.geeksforgeeks.org/how-to-test-react-components-using-jest/
 *
 * Gilberto Echeverria
 * 2022-08-18
 */

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

// Reset the DOM after each test suite
afterEach(() => {
  cleanup();
})

describe('App Component', () => {

  // Test 1: Rendering the whole app
  test('App rendering', () => {
    render(<App />);
    const button = screen.getByTestId('button');
    const text = screen.getByTestId('text');
    expect(button).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  // Test 2: The default value of the text component
  test('Default text', () => {
    render(<App />);
    const text = screen.getByTestId('text');
    expect(text).toHaveTextContent('Testing the buttons');
  });

  // Test 3: The toggling of the buttons
  test('Toggle button', () => {
    render(<App />);
    const button = screen.getByTestId('button');
    const text = screen.getByTestId('text');
    expect(text).toHaveTextContent('Testing the buttons');
    fireEvent.click(button);
    expect(text).toBeEmptyDOMElement();
    fireEvent.click(button);
    expect(text).toHaveTextContent('Testing the buttons');
  });

})
