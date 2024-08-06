const { Pool } = require("pg");
require("dotenv").config();
const  pool  = new Pool({
  user: process.env.PG_USER,
    password: String(process.env.PG_PASSWORD),
    host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});
pool.connect();

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully");
  }
});

// console.log({
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT,
//   database: process.env.PG_DATABASE,
// });


// creating new db
// pool
//   .query("CREATE DATABASE TEST_task_mangement ")
//   .then((Response) => {
//     console.log("The DB Created");
//     console.log(Response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// After creating the db you have to add it here in your code like in line 7

// const createTblQry = `
// CREATE TABLE accounts
// ( user_id serial PRIMARY KEY,
// username VARCHAR(50) UNIQUE NOT NULL,
// password VARCHAR(50) UNIQUE NOT NULL);`;

// pool
//     .query(createTblQry)
//     .then((Response) => {
//         console.log("Table Created");
//         console.log(Response);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

module.exports = {pool};
