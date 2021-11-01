// Code from https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/ and https://www.npmjs.com/package/password-hash
// This file contains the endpoints and exports them to index.js

const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  database: 'health_db',
  port: 5432,
})

var passwordHash = require('password-hash');

const getHelloWorld = (request, response) => {
    pool.query('SELECT * FROM hello_world', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0]["message"])
    })
}

// Returns user info if login info is valid, returns empty list otherwise
const validateLogin = (request, response) => {
    const email = request.params.email
    const password = request.params.password
  
    pool.query('SELECT password_hash FROM users WHERE email=$1', [email], (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length > 0) {
        if (passwordHash.verify(password, results.rows[0].password_hash)){
          pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).json(results.rows)
          })
        }
        else{
          response.status(200).json([])
        }
      }
      else{
        response.status(200).json([])
      }
    })
}


// Returns user info given id number
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

// Creates a new user. Needs name, email, password, and admin fields.
const createUser = (request, response) => {
    const { name, email, password, admin, bloodType, allergies } = request.body
    const hashedPassword = passwordHash.generate(password);
    
    pool.query('INSERT INTO users (name, email, password_hash, is_admin, bloodType, allergies) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [name, email, hashedPassword, admin, bloodType, allergies], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

// Updates a user. Needs name, email, password, admin fields, and Bloodtype .
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {name, email, password, admin,bloodType} = request.body
    const hashedPassword = passwordHash.generate(password);
  
    pool.query(
      'UPDATE users SET name = $1, email = $2, password_hash = $3, is_admin = $4, bloodType =$5, allergies = $6 WHERE id = $7',
      [name, email, hashedPassword, admin, bloodType, allergies, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

// Deletes a user given id number
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
// deletes a users current admin 
const deleteAdmin = (request, response) => {
  const id = parseInt(request.params.id)
  const { admin } = request.body
  pool.query( 'DELETE FROM users SET id = $2, is_admin = $1',
    [ admin, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    })
}

//updates a users admin 
const updateAdmin = (request, response) => {
  const id = parseInt(request.params.id)
  const {admin} = request.body
  const hashedPassword = passwordHash.generate(password);

  pool.query(
    'UPDATE users SET is_admin = $1 WHERE id = $2',
    [admin, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
// deletes a users current bloodtype 
const deleteBloodType = (request, response) => {
  const id = parseInt(request.params.id)
  const { bloodType } = request.body
  pool.query( 'DELETE FROM users SET id = $2, bloodType = $1',
    [ bloodType, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${bloodType}`)
    })
}
// updates a users bloodtype 
const updateBloodType = (request, response) => {
  const id = parseInt(request.params.id)
  const {bloodType} = request.body
  const hashedPassword = passwordHash.generate(password);

  pool.query(
    'UPDATE users SET bloodType = $1 WHERE id = $2',
    [bloodType, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${bloodType}`)
    }
  )
}
const deleteAllergies = (request, response) => {
  const id = parseInt(request.params.id)
  const { allergies} = request.body
  pool.query( 'DELETE FROM users SET id = $2, allergies = $1',
    [ allergies, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${allergies}`)
    })
}
// updates a users bloodtype 
const updateAllergies = (request, response) => {
  const id = parseInt(request.params.id)
  const {allergies} = request.body
  const hashedPassword = passwordHash.generate(password);

  pool.query(
    'UPDATE users SET allergies = $1 WHERE id = $2',
    [allergies, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${bloodType}`)
    }
  )
}

module.exports = {getHelloWorld, validateLogin, getUserById, createUser, updateUser, deleteUser, deleteAdmin, updateAdmin,deleteBloodType, updateBloodType, deleteAllergies, updateAllergies}