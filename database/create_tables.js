// Scott Crawshaw '22
// Code from https://dirask.com/posts/Node-js-PostgreSQL-Create-table-if-not-exists-DZXJNj and https://www.postgresqltutorial.com/postgresql-serial/

var passwordHash = require('password-hash');
const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "health_db"
});

client.connect();

// SQL commands that will be run
const create_hello = `DROP TABLE IF EXISTS hello_world; CREATE TABLE hello_world (message TEXT);`
const insert_hello = `INSERT INTO hello_world VALUES ('hello world');`
const create_users = `DROP TABLE IF EXISTS users; CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, is_admin BOOLEAN NOT NULL);`
const insert_user = `INSERT INTO users VALUES (DEFAULT, 'John Smith', 'johnsmithcs98health@gmail.com', '${passwordHash.generate("password")}', FALSE);`


const execute = async (query) => {
    try {
        await client.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

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
        client.end()
    });
});