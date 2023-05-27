import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from './DataTable';

// Reset DOM after each test suite
afterEach(() => {
  cleanup();
});

describe('DataTable Component', () => {

  const tableRows = ['HeadA', 'HeadB'];
  const values = [['a', '1'], ['b', '2']];
  render(<DataTable headers={tableRows} values={values} id='dataTable' />);
  const table = screen.getByTestId('dataTable');

  // Check if the table is displayed
  test('Table render', () => {
    expect(table).toBeInTheDocument();
  });

  // Check if the contents are displayed
  test('Table contents', () => {
    expect(table).toHaveTextContent('HeadA');
    expect(table).toHaveTextContent('HeadB');
    expect(table).toHaveTextContent('1');
    expect(table).toHaveTextContent('b');
  });

})
