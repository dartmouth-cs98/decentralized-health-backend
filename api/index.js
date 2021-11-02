// Code for this file and package.json from https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
// Endpoints exported from queries.js

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3838

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

// Endpoints
app.get('/hello', db.getHelloWorld)
app.get('/users/:id', db.getUserById)
app.get('/users/:email/:password', db.validateLogin)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
//app.delete('/users/:id', db.deleteAdmin) sql code for this is wrong, and it overloads the delete user endpoint
//app.put('/users/:id', db.updateAdmin) this overloads the update user endpoint, wont work

