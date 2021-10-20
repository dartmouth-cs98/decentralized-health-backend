// Code from https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
// This file contains the endpoints and exports them to index.js

const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  database: 'health_db',
  port: 5432,
})

const getHelloWorld = (request, response) => {
    pool.query('SELECT * FROM hello_world', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0]["message"])
    })
}
  
module.exports = {getHelloWorld}