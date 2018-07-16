const { Client } = require("pg");

var fs = require("fs");

var sql = fs.readFileSync("database/script.sql").toString();

async function setup() {
  const client = new Client({
    connectionString: "postgres://prisma:prisma@localhost:5432/prisma"
  });

  await client.connect();

  client.query(sql, function(err, result) {
    if (err) {
      console.log("error: ", err);
      process.exit(1);
    }
    process.exit(0);
  });
}

setup();
