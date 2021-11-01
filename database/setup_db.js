// Scott Crawshaw '22
// Code from https://kb.objectrocket.com/postgresql/how-to-create-a-postgres-database-with-nodejs-844
console.log('starting setup')

var pgtools = require("pgtools");
const dotenv = require('dotenv');

dotenv.config({silent: true});

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const configString = isProduction ? process.env.DATABASE_URL : connectionString

// create database named health_db
// what is this???? -> parse url?
console.log(`PG DATABASE IS: ${process.env.PGDATABASE}`)
console.log(`DATABASE_URL IS: ${process.env.DATABASE_URL}`)
pgtools.createdb(configString, process.env.PGDATABASE, function(err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});

console.log('finished setup')