// Code for this file and package.json from https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
// Endpoints exported from queries.js
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3838

app.use(cors({origin: '*', optionsSuccessStatus: 200}));
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
app.get('/users/:token/:id', db.getUserById)
app.get('/users/login/:email/:password/:eth_address', db.validateLogin)
app.post('/users', db.createUser)
app.put('/users/:token/:id', db.updateUser)
app.delete('/users/:token/:id', db.deleteUser)
app.delete('/users/login/:token/:id', db.signOut)
app.get('/search/email/:token/:email', db.getETH)
app.get('/search/eth/:token/:eth_address', db.getIDByETH)