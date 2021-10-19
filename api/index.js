// Code for this file and package.json from https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
// Endpoints exported from queries.js

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

const db = require('./queries')

app.get('/hello', db.getHelloWorld)