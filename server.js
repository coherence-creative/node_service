const express = require("express");
const BodyParser = require("body-parser");
const CronJob = require("cron").CronJob;
const mongoData = require("./email/emailService");

const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 7000;

const routes = require("./api/routes");

app.use("/", routes);

var job = new CronJob(
  "18 15 * * *",
  () => {
    console.log("cron running");
    mongoData();
  },
  null,
  true,
  "America/Denver"
);

job.start();

app.listen(port, function() {
  console.log("Server started on port: " + port);
});
