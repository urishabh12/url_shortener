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
  if (id.length < 6 || id.length > 6) {
    return [];
  }
  const query = `SELECT URL FROM URL WHERE ID = '${id}'`;
  let res;
  try {
    res = await pool.query(query);
  } catch (err) {
    console.log(err);
  }

  return res.rows;
}

module.exports = { get_by_id };
