// db.js
/*process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";*/
const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false,
    cert: fs.readFileSync(process.env.DB_CLIENT_CERT_PATH).toString(),
    key: fs.readFileSync(process.env.DB_CLIENT_KEY_PATH).toString(),
    ca: fs.readFileSync(process.env.DB_SERVER_CA_PATH).toString(),
  } : false
});

module.exports = pool;