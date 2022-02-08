// Scott Crawshaw '22
// Code from https://dirask.com/posts/Node-js-PostgreSQL-Create-table-if-not-exists-DZXJNj and https://www.postgresqltutorial.com/postgresql-serial/

console.log('starting create')
const dotenv = require('dotenv');
dotenv.config({silent: true});
// var passwordHash = require('password-hash');
const { Client } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';
console.log(`NODE ENV is ${process.env.NODE_ENV}`);
const client = new Client(
    {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
        ssl: isProduction? { rejectUnauthorized: false }: true
    }
);

client
    .connect()
    .then(() => {console.log('client connected')})
    .catch((error) => {
        console.log(`client failed to connect with error: ${error}`)
    });

// SQL commands that will be run
// const create_user = `CREATE ROLE ${process.env.PGUSER} WITH LOGIN PASSWORD '${process.env.PGPASSWORD}';`
// const give_role = `ALTER ROLE ${process.env.PGUSER} CREATEDB;`
const create_users = `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, is_admin BOOLEAN NOT NULL, eth_address TEXT NOT NULL);`
const create_auth = `CREATE TABLE IF NOT EXISTS auth (token TEXT PRIMARY KEY, id integer REFERENCES users ON DELETE CASCADE, timestamp TIMESTAMPTZ NOT NULL DEFAULT (NOW() + interval '336 hours'));`

// const execute = async (query) => {
//     try {
//         await client.query(query);  // sends queries
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     }
// };

// users table
client.query(create_users)
    .then(() => {console.log('users table created')})
    .catch((error) => console.log(error))

// auth table
client.query(create_auth)
    .then(() => {
        console.log('auth table created')
        client.end();
    })
    .catch((error) => console.log(error))

// execute(create_users).then(result => {
//     if (result) {
//         console.log('users table created.');
//     }
// });

// auth table
// execute(create_auth).then(result => {
//     if (result) {
//         console.log('auth table created.');
//     }
// });