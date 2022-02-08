// Scott Crawshaw '22
// Code from https://dirask.com/posts/Node-js-PostgreSQL-Create-table-if-not-exists-DZXJNj and https://www.postgresqltutorial.com/postgresql-serial/

console.log('starting create')
const dotenv = require('dotenv');
dotenv.config({silent: true});
// var passwordHash = require('password-hash');
const { Client } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';
const client = new Client(
    {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
        ssl: isProduction? { rejectUnauthorized: false }: false
    }
);

client
    .connect()
    .then(() => {console.log('client connected')})
    .catch((error) => {
        console.log(`client failed to connect with error: ${error}`)
    });

console.log('finished create');