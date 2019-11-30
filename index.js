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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Weather API interaction

// DialogFlow Fulfillment

function gedate(agent) {
  agent.add(
    "The General Election will take place on Thursday 12th December 2019"
  );
  agent.add(
    `The next General Election is planned to take place on the 12th December 2019`
  );
}

function welcome(agent) {
  agent.add(`???`);
}

function broadband(agent) {
  agent.add(`???`);
}

function WebhookProcessing(req, res) {
  const agent = new WebhookClient({ request: req, response: res });

  let intentMap = new Map();
  intentMap.set("When is the General Election", gedate);
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("What Gigabit Broadband Upgrade", broadband);
  agent.handleRequest(intentMap);
}

app.post("/weather", (req, res) => {
  console.log("DialogFlow Server Reached!!!");

  WebhookProcessing(req, res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
