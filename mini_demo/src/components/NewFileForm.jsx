/*
 * Register a new document to be inserted in the DB
 * https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react
 *
 * Gilberto Echeverria
 * 2022-09-02
 */

import { useReducer } from 'react';
import './NewFileForm.css';

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
    return {...state, [event.name]: event.value};
}

// Function component to show a red asterisk
function Required() {
    return (<span className="Required">* </span>);
}

function NewFileForm ({name}) {
    const [formData, setFormData] = useReducer(formReducer, {});

    function handleSubmit(event) {
        event.preventDefault();
        console.log("FORM DATA: ");
        console.log(formData);
        addDocument();
    }

    // Send the data to Mongo using an API
    async function addDocument() {
        try {
            const response = await fetch('/api/docs', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                })
            console.log("addDocument response: " + response);
            setFormData({ reset: true });
        } catch(error) {
            console.log("ERROR at 'addDocument'");
            console.log(error);
        }
    }

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
            <form onSubmit={handleSubmit}>
                <label><Required />Caso:</label>
                <input
                    type="number"
                    min="0"
                    name="caso"
                    value={formData.caso || 0}
                    onChange={handleChange} />
                <br />
                <label><Required />Folio:</label>
                <input
                    type="number"
                    min="0"
                    name="folio"
                    value={formData.folio || 0}
                    onChange={handleChange} />
                <br />
                <label><Required />Materia:</label>
                <select
                    name="materia"
                    onChange={handleChange}
                    value={formData.materia || 0}
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
                    onChange={handleChange} />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default NewFileForm;
