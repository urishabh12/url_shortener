const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { getCodes, updateUsedToTrue } = require("../service/url_code");
const isHttp = require("../service/utility");

let codes = new Map();

async function getUniqueCode(url) {
  let keyUsed;
  //When available codes empty
  if (codes.size == 0) {
    return "";
  }
  for (let key of codes.keys()) {
    keyUsed = key;
    break;
  }
  //update to datbase as used
  let res = await updateUsedToTrue(keyUsed, url);

  if (res) {
    codes.delete(keyUsed);
  } else {
    return "";
  }

  return keyUsed;
}

//Check for codes
setInterval(async () => {
  if (codes.size < 10) {
    let res = await getCodes(codes.size);
    res.forEach((data) => {
      codes.set(data, 1);
    });
  }
}, 1000);

router.post("/create", async (req, res) => {
  let url = req.body.url;
  let isValidUrl = isHttp(url);

  if (!isValidUrl) {
    return res.status(400).send({ error: "URL is not in http format" });
  }

  let code = await getUniqueCode(url);

  if (code === "") {
    return res
      .status(503)
      .send({ error: "Cannot generate url right now. We are Sorry" });
  }

  res.send({ code: code });
});

module.exports = router;
