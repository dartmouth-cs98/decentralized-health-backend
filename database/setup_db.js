// Code from https://kb.objectrocket.com/postgresql/how-to-create-a-postgres-database-with-nodejs-844

var pgtools = require("pgtools");

const db_config = {
    host: "localhost",
    port: 5432
};

pgtools.createdb(db_config, "health_db", function(err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});