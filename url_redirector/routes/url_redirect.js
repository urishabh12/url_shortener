const express = require("express");
const router = express.Router();
const { get_by_id } = require("../service/url_short");

router.get("/:code", async (req, res) => {
  const code = req.params.code;
  const url = await get_by_id(code);
  if (url.length == 0) {
    return res.status(404).send({ error: "url not found" });
  }
  res.status(302).redirect(url[0].url);
});

module.exports = router;
