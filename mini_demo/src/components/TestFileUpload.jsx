/*
 * Simple component to upload a file to the server
 * using a POST request.
 *
 * Gilberto Echeverria
 * 2022-09-26
 */


/// TESTING. MAY NOT WORK
import { useReducer } from 'react';

import './NewFileForm.css';
import TestDragDrop from './TestDragDrop.jsx';

// Predefined list of subjects. This should come from the database
const materias = ['penal', 'civil', 'judicial', 'amparo'];


// Function component to show a red asterisk
function Required() {
    return (<span className="Required">* </span>);
}


/// TESTING. MAY NOT WORK
// Function to update the state with data from the form
function formReducer(state, event) {
    if(event.reset) {
        return {
            caso: 0,
            folio: 0,
            materia: materias[0],
            persona: ''
        };
    }
    //console.log("NEW ITEM IN FORM REDUCER: " + event.value);
    return {...state,
        [event.name]:
        // Convert numerical values to number instead of string
        (isNaN(event.value) ? event.value : Number(event.value) )};
}

// The form will be submitted to the server using a POST request
// The file will be sent as a multipart/form-data
export default function TestFileUpload() {

  /// TESTING. MAY NOT WORK
  const [formData, setFormData] = useReducer(formReducer,
                                              {'materia': materias[0]});

  /// TESTING. MAY NOT WORK
  function submitForm(e) {
    e.preventDefault();
    const submitData = new FormData();
    for (let [key, value] of Object.entries(formData)) {
      submitData.append(key, value);
    }
    fetch("/api/addfile", {
      method: 'POST',
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => console.log(res))
      .catch((err) => ("Error occured" + err));
  }


  return (
    <form
      id="file_form"
      encType="multipart/form-data"
      method="POST"
      //action="/api/addfile"
      onSubmit={submitForm}
      className="FileForm"
    >
      <h2>SIMPLE FILE UPLOAD FORM FORM</h2>

      {/*
      <label htmlFor="file_name">File name:</label>
      <input type="text" name="nombre" />
      <br />
      <label htmlFor="file_input">File to upload:</label>
      <input type="file" name="file_input" />
      <br />
      <input type="submit" value="Submit" />
      */}

      <label><Required />Caso:</label>
      <input
        type="number"
        min="0"
        name="caso"
      />
      <br />
      <label><Required />Folio:</label>
      <input
        type="number"
        min="0"
        name="folio"
      />
      <br />
      <label><Required />Materia:</label>
      <select
        name="materia"
      >
        {materias.map((mat, index) => {
          return (<option value={mat} key={index}>{mat}</option>);
        })}
      </select>
      <br />
      <label>Persona:</label>
      <input
        type="text"
        name="persona"
      />
      <br />
      <label htmlFor="file_input">File to upload:</label>
      <TestDragDrop name="file_input" setFormData={setFormData} />
      {/* <input type="file" name="file_input" /> */}
      <br />
      <input type="submit" value="Submit" />

    </form>
  );
}

