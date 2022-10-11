/*
 * Register a new document to be inserted in the DB
 * https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react
 *
 * Gilberto Echeverria
 * 2022-09-02
 */

import { useReducer } from 'react';
//import { addDocument } from '../modules/db_api.js';
//import { addFileDocument } from '../modules/db_api.js';
import './NewFileForm.css';
// import DragDropFile from './DragDropFile.jsx';

// Predefined list of subjects. This should come from the database
const materias = ['penal', 'civil', 'judicial', 'amparo'];

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



// Function component to show a red asterisk
function Required() {
    return (<span className="Required">* </span>);
}

function NewFileForm ({name}) {
    const [formData, setFormData] = useReducer(formReducer,
                                                {'materia': materias[0]});

    /*
    function handleSubmit(event) {
        event.preventDefault();
        console.log("FORM DATA: " + formData);
        addDocument(formData, setFormData);
    }
    */

    /*
    function handleSubmitFile(event) {
        event.preventDefault();
        const fileFormData = new FormData();
        fileFormData.append("file_input", formData.file_input);
        fileFormData.append("caso", formData.caso);
        fileFormData.append("folio", formData.folio);
        fileFormData.append("materia", formData.materia);
        fileFormData.append("persona", formData.persona);
        console.log("FILE FORM DATA: " + fileFormData);
        console.log("USING caso: " + formData.caso + " as " + fileFormData.get("caso"));
        addFileDocument(formData, setFormData);
    }
    */

    // Function to activate the reducer
    // It organizes the data from the event so it can be correctly used
    function handleChange(event) {
        setFormData({
            name: event.target.name,
            value: event.target.value
        });
    }

    return (
        <div>
            <h1>Add new document</h1>
            <form
                // onSubmit={handleSubmitFile}
                action="/api/addfile"
                className="FileForm"
                encType="multipart/form-data"
                method="POST"
            >
                <label><Required />Caso:</label>
                <input
                    type="number"
                    min="0"
                    name="caso"
                    value={formData.caso || 0}
                    onChange={handleChange}
                    required
                />
                <br />
                <label><Required />Folio:</label>
                <input
                    type="number"
                    min="0"
                    name="folio"
                    value={formData.folio || 0}
                    onChange={handleChange}
                    required
                />
                <br />
                <label><Required />Materia:</label>
                <select
                    name="materia"
                    onChange={handleChange}
                    value={formData.materia || 0}
                    required
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
                    value={formData.persona || ''}
                    onChange={handleChange}
                />
                <br />
                {/* <DragDropFile setFormData={setFormData} name="file_input"/> */}
                <label>Documento:</label>
                <input
                    type="file"
                    name="file_input"
                    value={formData.file_input || ''}
                    accept="application/pdf"
                    onChange={handleChange}
                    required
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default NewFileForm;
