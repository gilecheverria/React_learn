

import {grade_to_letter, date_to_american, remove_surname, format_line} from './conversions'

describe('Individual functions', () => {

  test('grade conversion', () => {
    expect(grade_to_letter(99)).toBe('A');
    expect(grade_to_letter(94)).toBe('A');
    expect(grade_to_letter(92)).toBe('A-');
    expect(grade_to_letter(88)).toBe('B+');
    expect(grade_to_letter(80)).toBe('B-');
    expect(grade_to_letter(74)).toBe('C');

    expect(grade_to_letter(30)).toBe('E');
  });

  test('date conversion', () => {
    expect(date_to_american('17/08/2022')).toBe('08/17/2022');
    expect(date_to_american('17/08/2022')).not.toBe('17/08/2022');
    expect(date_to_american('31/12/2022')).toBe('12/31/2022');
    expect(date_to_american('31/12/2022')).not.toBe('31/12/2022');
    expect(date_to_american('01/01/2022')).toBe('01/01/2022');
  });

  test('renove surname', () => {
    expect(remove_surname('One Two Three')).toBe('One Two');
    expect(remove_surname('Gilberto Echeverria Furio')).toBe('Gilberto Echeverria');
    expect(remove_surname('Paco Gomez Juarez')).toBe('Paco Gomez');
  });

});

describe('Complete line', () => {
  test('convert line', () => {
    let line = [];
    let result = [];
    line = ['1', 'One Two Three', 'A01234567', '20/08/2020', '70'];
    result = ['1', 'One Two', 'A01234567@tec.mx', '08/20/2020', 'C-'];
    expect(format_line(line)).toStrictEqual(result);
    line = ['8', 'Juan Perez Marin', 'a09876543', '15/12/2022', '65'];
    result = ['8', 'Juan Perez', 'a09876543@tec.mx', '12/15/2022', 'D'];
    expect(format_line(line)).toStrictEqual(result);
    line = ['49', 'Maria Diaz Tapia', 'A98762345', '07/03/2021', '30'];
    result = ['49', 'Maria Diaz', 'A98762345@tec.mx', '03/07/2021', 'E'];
    expect(format_line(line)).toStrictEqual(result);
    //expect(format_line(['a', 'b', 'c'])).toThrow();
  });

});
