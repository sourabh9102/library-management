const mysql = require("mysql");

const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
};

module.exports = {
  mysql,
  dbConfig,
};
