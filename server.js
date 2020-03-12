const express = require('express')
const app = express();
const CronJob = require('cron').CronJob;
const port = process.env.PORT || 3000;

const routes = require('./api/routes');

app.use("/", routes)

// routes(app);

// var job = new CronJob('18 15 * * *', () => {
//    console.log("cron running")
// }, null, true, 'America/Denver')

// job.start()

app.listen(port, function() {
   console.log('Server started on port: ' + port);
});