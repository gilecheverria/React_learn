/*
 * Functions to interact with the database through an API
 *
 * Gilberto Echeverria
 */

/*
 * Request all the documents from the database
 */
async function getDocuments(setData) {
  try {
    const route = process.env.REACT_APP_API + '/api/docs/';
    console.log("ROUTE: " + route);
    const response = await fetch(route,
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
    const route = process.env.REACT_APP_API + '/api/getdocs/';
    console.log("ROUTE: " + route);
    await fetch(route, {
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

/*
 * Send the data to Mongo using an API, including the file to upload
 */
async function addFileDocument(formData) {
  console.log("'addFileDocument' QUERY: " + JSON.stringify(formData));
  //console.log("'addFileDocument' caso: " + formData.get('caso'));
  try {
    const route = process.env.REACT_APP_API + '/api/addfile';
    console.log("ROUTE: " + route);
    await fetch(route, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        console.log("addFileDocument response: " + response);
      })
  } catch(error) {
    console.log("ERROR at 'addFileDocument'");
    console.log(error);
  }
}

/*
 * Download a file indicated as an argument
async function downloadFile(file) {
  console.log("'downloadFile' QUERY: " + file);
  // Configure the location of the backend server in the .env file
  console.log("ENV: " + JSON.stringify(process.env));
  const route = process.env.REACT_APP_API + '/api/getfile/' + file;
  console.log("ROUTE: " + route);
  try {
    await fetch(route, {
      method: "GET"
    })
      .then(response => response.blob())
      .then(theBlob => {
        console.log("RESULT FILE: " + JSON.stringify(theBlob));
        // Create a link to download the file
        const href = URL.createObjectURL(theBlob);
        const link = document.createElement('a');
        link.href = href;
        link.download = `${file}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

  } catch(error) {
    console.log("ERROR at 'downloadFile'");
    console.log(error);
  }
}
 */

/*
 * Request to validate a username and password
 */
async function loginUser(formData, setToken, destination) {
  console.log("'loginUser' QUERY: " + JSON.stringify(formData));
  try {
    const route = process.env.REACT_APP_API + '/api/login';
    console.log("ROUTE: " + route);
    await fetch(route, {
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
        // if (response !== null) {
        //   console.log("LOGIN SUCCESS");
        //   return JSON.JSON.stringify(response);
        // } else {
        //   console.log("LOGIN FAILED");
        //   return null;
        // }
      })
  } catch(error) {
    console.log("ERROR at 'loginUser'");
    console.log(error);
  }
}

export { loginUser,
  getDocuments,
  getFilteredDocuments,
  addFileDocument,
  //downloadFile
};
