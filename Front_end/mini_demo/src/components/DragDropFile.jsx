/*
 * Component to allow selection of files to upload
 * by either clicking a button or dragging the file
 *
 * Based on:
 * https://www.codemzy.com/blog/react-drag-drop-file-upload
 *
 * Gilberto Echeverria
 * 2022-09-13
 */

import { useState } from 'react';
import './DragDropFile.css';

// Receive a function to store the file selected
function DragDropFile({setFormData}) {
  const [dragActive, setDragActive] = useState(false);

  function uploadFile(file) {
    console.log('FILE SELECTED: ' + file.name);
    setFormData({
        name: "filename",
        value: file.name
    });
    setFormData({
        name: "fileobject",
        value: file
    });
  }

  function handleDrag(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      uploadFile(event.dataTransfer.files[0]);
    }
  }

  function handleChange(event) {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      uploadFile(event.target.files[0]);
    }
  }

  /*
  function handleSubmit(event) {
    event.preventDefault();
  }
  */

  return (
    <div
      id="form-file-upload"
      onDragEnter={handleDrag}
    >
      {/*
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={handleSubmit}
    >
    */}
      <input
        type="file"
        id="input-file-upload"
        onChange={handleChange}
        accept="application/pdf"
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <p>Drag and drop your file here</p>
          <button className="upload-button">Select a file</button>
        </div>
      </label>
      {/* Invisible object to cover the form when dragging */}
      { dragActive && <div
                        id="drag-file-element"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}></div> }
      {/*
    </form>
    */}
    </div>
  );
}

export default DragDropFile;
