/*
 * Functions to interact with the database through an API
 *
 * Gilberto Echeverria
 */

async function getDocuments(setData) {
  try {
    const response = await fetch('/api/docs',
      {mode:'cors'});
    console.log("RESPONSE: " + response);
    const data = await response.json();
    //const data = JSON.stringify(response);
    console.log("DATA RECEIVED: " + {data});
    setData(data);
  } catch(error) {
    console.log("ERROR at 'getDocuments'");
    console.log(error);
    return [];
  }
}

async function getFilteredDocuments(jsonQuery, setData) {
  console.log("'getFilteredDocuments' QUERY: " + JSON.stringify(jsonQuery));
  try {
    await fetch('/api/getdocs', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(jsonQuery)
    })
      .then(response => response.json())
      .then(response => {
        console.log("getFilteredDocuments response: " + JSON.stringify(response));
        setData(response);
      })
  } catch(error) {
    console.log("ERROR at 'getFilteredDocuments'");
    console.log(error);
  }
}

// Send the data to Mongo using an API
async function addDocument(formData, setFormData) {
  console.log("'addDocument' QUERY: " + JSON.stringify(formData));
  try {
    await fetch('/api/adddoc', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(response => {
        console.log("addDocument response: " + response);
      })
    setFormData({ reset: true });
  } catch(error) {
    console.log("ERROR at 'addDocument'");
    console.log(error);
  }
}

export { getDocuments, getFilteredDocuments, addDocument };
