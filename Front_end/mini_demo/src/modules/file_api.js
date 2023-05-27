/*
 * Functions to interact with the database through an API
 *
 * Gilberto Echeverria
 */

async function uploadFile(formData, setFormData) {
  console.log("'uploadFile' QUERY: " + JSON.stringify(formData));
  try {
    await fetch('/api/upload', {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        console.log("uploadFile response: " + response);
      })
    setFormData({ reset: true });
  } catch(error) {
    console.log("ERROR at 'uploadFile'");
    console.log(error);
  }
}

export { uploadFile };
