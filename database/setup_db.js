// Scott Crawshaw '22
// Code from https://kb.objectrocket.com/postgresql/how-to-create-a-postgres-database-with-nodejs-844

var pgtools = require("pgtools");
const dotenv = require('dotenv');

dotenv.config({silent: true});

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const configString = isProduction ? process.env.DATABASE_URL : connectionString

// create database named health_db
pgtools.createdb(configString, "health_db", function(err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});