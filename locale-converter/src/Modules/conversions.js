/*
 * Module with functions to convert data from one format to another
 *
 * Gilberto Echeverria
 * 2022-08-17
 */

function grade_to_letter(grade) {
  let letter = 'E';
  if(grade >= 93) {
    letter = 'A';
  } else if(grade >= 90) {
    letter = 'A-';
  } else if(grade >= 97) {
    letter = 'B+';
  } else if(grade >= 83) {
    letter = 'B';
  } else if(grade >= 80) {
    letter = 'B-';
  } else if(grade >= 77) {
    letter = 'C+';
  } else if(grade >= 73) {
    letter = 'C';
  } else if(grade >= 70) {
    letter = 'C-';
  } else if(grade >= 67) {
    letter = 'D+';
  } else if(grade >= 64) {
    letter = 'D';
  }
  return letter;
}

function date_to_american(date) {
  const [day, month, year] = date.split('/');
  return [month, day, year].join('/');
}

function remove_surname(fullName) {
  const [name, surname1, surname2] = fullName.split(' ');
  return [name, surname1].join(' ');
}

function format_line([id, name, mat, date, grade]) {
  const newLine = [
    id,
    remove_surname(name),
    mat + "@tec.mx",
    date_to_american(date),
    grade_to_letter(grade)
  ];
  return newLine;
}

export {grade_to_letter, date_to_american, format_line};
