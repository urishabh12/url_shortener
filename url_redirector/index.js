const express = require("express");
const app = express();
const url = require("./routes/url_redirect");

app.use(url);

app.listen(6002, () => {
  console.log("Listening on 6002.....");
});
