const { Pool } = require('pg');  // Importando o Pool
const fs = require('fs');
const path = require('path');


const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: process.env.DB_SSL === 'true'
    ? {
        rejectUnauthorized: false,
        cert: fs.readFileSync(path.join(__dirname, process.env.DB_CLIENT_CERT_PATH)),
        key: fs.readFileSync(path.join(__dirname, process.env.DB_CLIENT_KEY_PATH)),
        ca: fs.readFileSync(path.join(__dirname, process.env.DB_SERVER_CA_PATH)),
      }
    : false
});

module.exports = pool;
