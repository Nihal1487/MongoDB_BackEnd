const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const db = require("./db/connection.js");
const Racer = require("./model/model.js");
const raceRouter = require("./router/app.js")
app.use(express.json());
app.use(raceRouter)


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
