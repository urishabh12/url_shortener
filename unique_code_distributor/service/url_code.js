const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { Pool } = require("pg");

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "url_shortener",
  max: 5,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

const codesSizeRequired = 100;

async function getCodes(n) {
  let required = codesSizeRequired - n;
  let url = "http://localhost:6000/api/unique_code/get/" + required;
  let res = [];
  if (n < 1000) {
    res = await fetch(url)
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }

  return res.codes;
}

async function updateUsedToTrue(code, url) {
  const query = `update url set used = 't', url = '${url}' where id = '${code}'`;
  let res;
  try {
    res = await pool.query(query);
  } catch (err) {
    console.log(err);
    return 0;
  }

  return res.rowCount;
}

module.exports = { getCodes, updateUsedToTrue };
