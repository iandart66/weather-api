const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient } = require("dialogflow-fulfillment");

require("dotenv").config();

const {
  dialogflow,
  actionsdk,
  Image,
  Table,
  Carousel
} = require("actions-on-google");

const app = express();

const host = "api.openweathermap.org"; // OpenWeather API link
const weatherAPI = process.env.API;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Weather API interaction

function callWeatherApi(city, date) {
  return new Promise((resolve, reject) => {
    //Create the path for the HTTP request
    let path = host + "/data/2.5/weather?q=" + city + "&appid=" + weatherAPI;
    console.log("Path: " + path);
  });
}

// DialogFlow Fulfillment

function getweather(agent) {
  agent.add(
    "The General Election will take place on Thursday 12th December 2019"
  );
}

function WebhookProcessing(req, res) {
  const agent = new WebhookClient({ request: req, response: res });

  let intentMap = new Map();
  intentMap.set("Get Weather", getweather);
  agent.handleRequest(intentMap);
}

// DialogFlow Entry Point

app.post("/weather", (req, res) => {
  console.log("DialogFlow Server Reached!!!");

  // Determine what City is being requested
  let city = req.body.queryResult.parameters["geo-city"] || "Not provided";
  console.log(`City being requested is ${city}`);

  // Determine what date is being requested
  date = "";
  if (req.body.queryResult.parameters["date"]) {
    let date = req.body.queryResult.parameters["date"];
    console.log("Date: " + date);
  }

  WebhookProcessing(req, res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
