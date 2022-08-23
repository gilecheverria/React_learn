import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecordForm from './RecordForm';

// Reset DOM after each test suite
afterEach(() => {
  cleanup();
});

describe('RecordForm Component', () => {

  render(<RecordForm />);
  const form = screen.getByTestId('recordForm');

  // Check if the form is displayed
  test('Form render', () => {
    expect(form).toBeInTheDocument();
  });

})
