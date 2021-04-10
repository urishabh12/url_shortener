const express = require("express");
const app = express();
const unique_code = require("./routes/unique_code");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/unique_code", unique_code);

app.listen(6001, () => {
  console.log("Listening on 6001.....");
});
