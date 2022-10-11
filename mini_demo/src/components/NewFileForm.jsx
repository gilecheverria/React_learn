/*
 * Register a new document to be inserted in the DB
 * https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react
 *
 * Gilberto Echeverria
 * 2022-09-02
 */

import { useForm } from 'react-hook-form';
import { addFileDocument } from '../modules/db_api.js';
import './NewFileForm.css';
// import DragDropFile from './DragDropFile.jsx';

// Predefined list of subjects. This should come from the database
const materias = ['penal', 'civil', 'judicial', 'amparo'];


// Function component to show a red asterisk
function Required() {
    return (<span className="Required">* </span>);
}

function NewFileForm ({name}) {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("caso", data.caso);
        formData.append("folio", data.folio);
        formData.append("materia", data.materia);
        formData.append("persona", data.persona);
        formData.append("file_input", data.file_input[0]);
        console.log("USING caso: " + data.caso + " as " + formData.get("caso"));
        addFileDocument(formData);
     };

    return (
        <div>
            <h1>Add new document</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                //action="/api/addfile"
                className="FileForm"
                encType="multipart/form-data"
                method="POST"
            >
                <label><Required />Caso:</label>
                <input
                    type="number"
                    {...register("caso", { required: true, min: 0 })}
                />
                <br />
                <label><Required />Folio:</label>
                <input
                    type="number"
                    {...register("folio", { required: true, min: 0 })}
                />
                <br />
                <label><Required />Materia:</label>
                <select
                    name="materia"
                    {...register("materia", { required: true })}
                >
                    {materias.map((mat, index) => {
                        return (<option value={mat} key={index}>{mat}</option>);
                    })}
                </select>
                <br />
                <label>Persona:</label>
                <input
                    type="text"
                    {...register("persona")}
                />
                <br />
                {/* <DragDropFile setFormData={setFormData} name="file_input"/> */}
                <label>Documento:</label>
                <input
                    type="file"
                    name="file_input"
                    accept="application/pdf"
                    {...register("file_input", { required: true })}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default NewFileForm;
