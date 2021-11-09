// Scott Crawshaw '22
// Code from https://dirask.com/posts/Node-js-PostgreSQL-Create-table-if-not-exists-DZXJNj and https://www.postgresqltutorial.com/postgresql-serial/

console.log('starting create')
const dotenv = require('dotenv');
dotenv.config({silent: true});
var passwordHash = require('password-hash');
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

try {
    client.connect();
} catch (error) {
    console.log(`client failed to connect with error: ${error}`)
}

// SQL commands that will be run
const create_user = `CREATE ROLE ${process.env.PGUSER} WITH LOGIN PASSWORD '${process.env.PGPASSWORD}';`
const give_role = `ALTER ROLE ${process.env.PGUSER} CREATEDB;`
const create_hello = `DROP TABLE IF EXISTS hello_world; CREATE TABLE hello_world (message TEXT);`
const insert_hello = `INSERT INTO hello_world VALUES ('hello world');`
const create_users = `DROP TABLE IF EXISTS users cascade; CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, is_admin BOOLEAN NOT NULL, eth_address TEXT NOT NULL);`
const insert_user = `INSERT INTO users VALUES (DEFAULT, 'John Smith', 'johnsmithcs98health@gmail.com', '${passwordHash.generate("password")}', FALSE, '1234');`
const create_auth = `DROP TABLE IF EXISTS auth; CREATE TABLE auth (token TEXT PRIMARY KEY, id integer REFERENCES users ON DELETE CASCADE, timestamp TIMESTAMPTZ NOT NULL DEFAULT (NOW() + interval '336 hours'));`
const insert_auth = `INSERT INTO auth (token, id) VALUES ('8d50a388f44915f44dda067276722595f885aacc01e26d4eb3f7495a8d477a4d787bd4277ab46fb31cb0db4837ca8da1de8987ad03dc158709036e6fd1c84aa9', 1);`

const execute = async (query) => {
    try {
        await client.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

// make db user
// execute(create_user).then(result => {
//     if (result) {
//         console.log('db user created');
//     }

//     execute(give_role).then(result => {
//         if (result) {
//             console.log('user given db permission');
//         }
//     });
// }).catch(error => {
//     console.log(`error creating user for db: ${error}`)
// });

// hello_world table
execute(create_hello).then(result => {
    if (result) {
        console.log('hello_world table created.');
    }

    execute(insert_hello).then(result => {
        if (result) {
            console.log('Test message added to hello_world table.');
        }
    });
}).catch(error => {
    console.log(`error creating hello_world table: ${error}`)
});

// users table
execute(create_users).then(result => {
    if (result) {
        console.log('users table created.');
    }

    execute(insert_user).then(result => {
        if (result) {
            console.log('Test user added to users table.');
        }
    });
});

// auth table
execute(create_auth).then(result => {
    if (result) {
        console.log('auth table created.');
    }

    execute(insert_auth).then(result => {
        if (result) {
            console.log('Test auth added to auth table.');
        }
        client.end()
    });
});

console.log('finished create');