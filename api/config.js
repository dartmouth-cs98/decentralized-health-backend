const dotenv = require('dotenv');
const {Pool} = require('pg');

dotenv.config({silent: true});

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction? { rejectUnauthorized: false }: true

})

module.exports = {pool};
