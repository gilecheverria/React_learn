import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Text from './Text';

// Reset the DOM after each test suite
afterEach(() => {
  cleanup();
})


describe('Text Component', () => {
  // Test 1: Is the text rendered correctly in the DOM
  test('Text Rendering', () => {
    render(<Text toggle={true} displayText="Some test text" />);
    const text = screen.getByTestId('text');
    expect(text).toBeInTheDocument();
  });

  // Test 2: Is the text displayed when toggle is on
  test('Text toggle true', () => {
    render(<Text toggle={true} displayText="Some test text" />);
    const text = screen.getByTestId('text');
    expect(text).toHaveTextContent('Some test text');
  });

  // Test 3: Is the text displayed when toggle is off
  test('Text toggle true', () => {
    render(<Text toggle={false} displayText="Some test text" />);
    const text = screen.getByTestId('text');
    expect(text).toBeEmptyDOMElement();
    //expect(text).not.toHaveTextContent('Some test text')
  });
})
