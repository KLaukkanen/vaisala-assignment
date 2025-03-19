import pg from "pg";

import fs from "fs";
import path from "path";

const { Client } = pg;
console.log(process.env.DB_CONNECTION_STRING);
const client = new Client({
  connectionString: "postgresql://postgres:admin@localhost:5432/vaisala",
});
const sql = fs.readFileSync(path.join(__dirname, "./script.sql")).toString();

client.connect().then(() => {
  client
    .query(sql)
    .then((res) => {
      console.log(res);
      console.log("Promise resolved");
      client.end();
    })
    .catch((err) => {
      console.log(err);
      console.log("Promise rejected");
      client.end();
    });
});
