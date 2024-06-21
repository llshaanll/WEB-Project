import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "llshaanKumarll";
const yourPassword = "shaanKumar03369";
const yourAPIKey = "03e64c6b-473e-491a-8742-719befb6bac1";
const yourBearerToken = "6acad41a-864b-403a-a4e3-187b1d4622ef";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    res.render(index.ejs, { content: JSON.stringify(result.data) });
  }
  catch (error) {
    res.status(404).send(error.message);
  }
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
    },
    });
    res.render(index.ejs, { content: JSON.stringify(result.data) });
  }
  catch (error) {
    res.status(404).send(error.message);
  }
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/filter", {
      auth: {
        score: 7,
        apiKey: yourAPIKey
    },
    });
    res.render(index.ejs, { content: JSON.stringify(result.data) });
  }
  catch (error) {
    res.status(404).send(error.message);
  }
});


app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", {headers: { Authorization: `Bearer ${yourBearerToken}` },});
    res.render(index.ejs, { content: JSON.stringify(result.data) });
  }
  catch (error) {
    res.status(404).send(error.message);
  }
});
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
