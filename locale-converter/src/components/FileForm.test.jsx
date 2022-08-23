import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileForm from './FileForm';

// Reset DOM after each test suite
afterEach(() => {
  cleanup();
});

describe('FileForm Component', () => {

  render(<FileForm />);
  const form = screen.getByTestId('inputForm');

  // Check if the form is displayed
  test('Form render', () => {
    expect(form).toBeInTheDocument();
  });

})
