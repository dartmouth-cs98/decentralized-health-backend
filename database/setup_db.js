// Code from https://kb.objectrocket.com/postgresql/how-to-create-a-postgres-database-with-nodejs-844 and https://dirask.com/posts/Node-js-PostgreSQL-Create-table-if-not-exists-DZXJNj

var pgtools = require("pgtools");
const { Client } = require('pg');

const db_config = {
    host: "localhost",
    port: 5432
};

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "health_db"
});

const setup_hello = `CREATE TABLE hello_world (message VARCHAR(50)); INSERT INTO hello_world VALUES ('hello world');`

const execute = async (query) => {
    try {
        await client.connect();     // gets connection
        await client.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();         // closes connection
    }
};

pgtools.createdb(db_config, "health_db", function(err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);

  execute(setup_hello).then(result => {
        if (result) {
            console.log('Hello world table created.');
        }
    });
});