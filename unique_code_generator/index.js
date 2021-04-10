const express = require("express");
const app = express();
const unique_code = require("./routes/unique_code");

app.use("/api/unique_code", unique_code);

app.listen(6000, () => {
  console.log("Listening on 6000.....");
});
