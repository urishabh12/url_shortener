const express = require("express");
const router = express.Router();
const { get_by_id, add } = require("../service/url_short");

let codeSize = 6;
let alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

function getRandomCode() {
  let index;
  let randomCode = "";
  for (let i = 0; i < codeSize; i++) {
    index = Math.floor(Math.random() * 100) % 62;
    randomCode += alphabets[index];
  }

  return randomCode;
}

async function getAvailableCodes(n) {
  let codes = [];
  let code;

  while (codes.length < n) {
    code = getRandomCode();
    const result = await get_by_id(code);
    //If it does not exists in table
    if (result.length == 0) {
      const insert = await add(code);
      //if inserted in table
      if (insert == 1) {
        codes.push(code);
      }
    }
  }

  return codes;
}

router.get("/get/:count", async (req, res) => {
  let count = req.params.count;
  let codes = await getAvailableCodes(count);

  res.send({ codes: codes });
});

module.exports = router;
