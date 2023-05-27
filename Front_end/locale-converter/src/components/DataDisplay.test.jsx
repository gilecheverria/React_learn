import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataDisplay from './DataDisplay';

// Reset DOM after each test suite
afterEach(() => {
  cleanup();
});

describe('DataDisplay Component', () => {

  const table1Rows = ['HeadA', 'HeadB'];
  const values1 = [['a', '1'], ['b', '2']];
  //const table2Rows = ['HeadX', 'HeadY'];
  const values2 = [['m', '18'], ['n', '19']];
  render(<DataDisplay
    tableRows={table1Rows}
    values={values1}
    newValues={values2}
  />);
  const table1 = screen.getByTestId('tableOriginal');
  const table2 = screen.getByTestId('tableResults');

  // Check if the table is displayed
  test('Tables render', () => {
    expect(table1).toBeInTheDocument();
    expect(table2).toBeInTheDocument();
  });

  // Check if the contents are displayed
  test('Tables contents', () => {
    expect(table1).toHaveTextContent('HeadA');
    expect(table1).toHaveTextContent('HeadB');
    expect(table1).toHaveTextContent('1');
    expect(table1).toHaveTextContent('b');
    expect(table2).toHaveTextContent('HeadA');
    expect(table2).toHaveTextContent('HeadB');
    expect(table2).toHaveTextContent('18');
    expect(table2).toHaveTextContent('n');
  });

})
