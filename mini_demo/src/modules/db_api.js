/*
 * Functions to interact with the database through an API
 *
 * Gilberto Echeverria
 */

/* Request all the documents from the database */
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

/*
 * Request documents using a specific query
 * The query is a JSON object with the fields to filter
 */
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

/* Store a new document in the database */
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

/* Send the data to Mongo using an API, including the file to upload */
async function addFileDocument(formData, setFormData) {
  console.log("'addFileDocument' QUERY: " + JSON.stringify(formData));
  console.log("'addFileDocument' caso: " + formData.get('caso'));
  try {
    await fetch('/api/addfile', {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        console.log("addFileDocument response: " + response);
      })
    setFormData({ reset: true });
  } catch(error) {
    console.log("ERROR at 'addFileDocument'");
    console.log(error);
  }
}

async function loginUser(formData, setToken, destination) {
  console.log("'loginUser' QUERY: " + JSON.stringify(formData));
  try {
    await fetch('/api/login', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(response => {
        console.log("loginUser response: " + JSON.stringify(response));
        setToken(response);

      })
  } catch(error) {
    console.log("ERROR at 'loginUser'");
    console.log(error);
  }
}

export { loginUser, getDocuments, getFilteredDocuments, addDocument,
         addFileDocument };
