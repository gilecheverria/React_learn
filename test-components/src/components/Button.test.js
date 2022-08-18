import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

// Reset the DOM after each test suite
afterEach(() => {
  cleanup();
})


describe('Button Component', () => {
  const setToggle = jest.fn();
  render(<Button setToggle={setToggle} btnTxt="Test Button" />);
  const button = screen.getByTestId('button');

  // Test 1: Is the button rendered correctly in the DOM
  test('Button Rendering', () => {
    expect(button).toBeInTheDocument()
  });

  // Test 2: Is the button displaying the text indicated
  test('Button Text', () => {
    expect(button).toHaveTextContent('Test Button')
  });
})
