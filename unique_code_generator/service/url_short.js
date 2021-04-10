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

async function get_by_id(id) {
  const query = `select id, used, time from url where id = '${id}'`;
  let res;
  //Need all the rows
  try {
    res = await pool.query(query);
  } catch (err) {
    console.log(err);
  }

  return res.rows;
}

async function add(id) {
  const time = new Date().toISOString().slice(0, 19).replace("T", " ");
  const query = `insert into url(id, used, time) values('${id}', '0', '${time}')`;
  let res;
  try {
    res = await pool.query(query);
  } catch (err) {
    console.log(err);
  }

  return res.rowCount;
}

module.exports = { get_by_id, add };
