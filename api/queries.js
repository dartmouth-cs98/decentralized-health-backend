// Code from https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/ and https://www.npmjs.com/package/password-hash
// This file contains the endpoints and exports them to index.js
const { pool } = require('./config');

var passwordHash = require('password-hash');
var crypto = require('crypto');


function authenticate(token, id, callback) {
  pool.query('SELECT count(*) FROM auth WHERE token=$1 AND id=$2 AND timestamp > NOW();', [token, id], (error, results) => {
    if (error || parseInt(results.rows[0]["count"]) == 0) {
      callback(false)
    }
    else {
      callback(true)
    }
  })
}

function authenticate_any(token, callback) {
  pool.query('SELECT count(*) FROM auth WHERE token=$1 AND timestamp > NOW();', [token], (error, results) => {
    if (error || parseInt(results.rows[0]["count"]) == 0) {
      callback(false)
    }
    else {
      callback(true)
    }
  })
}


// const getHelloWorld = (request, response) => {
//     pool.query('SELECT * FROM hello_world', (error, results) => {
//         if (error) {
//           response.status(500).json({ error })
//         }
//         response.status(200).json(results.rows[0]["message"])
//     })
// }

// Returns eth address given email. Any valid token works
const getETH = (request, response) => {
  const email = request.params.email
  const token = request.params.token

  const callback = (authenticated) => {
    if (!authenticated){
      response.status(401).send("401 Unauthorized")
    }
    else {
      pool.query('SELECT eth_address FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
          response.status(500).json({ error })
        }
        response.status(200).json(results.rows)
      })
    }
  }

  authenticate_any(token, callback)
}

// Returns id given eth address. Any valid token works
const getIDByETH = (request, response) => {
  const eth_address = request.params.eth_address
  const token = request.params.token

  const callback = (authenticated) => {
    if (!authenticated){
      response.status(401).send("401 Unauthorized")
    }
    else {
      pool.query('SELECT id FROM users WHERE eth_address = $1', [eth_address], (error, results) => {
        if (error) {
          response.status(500).json({ error })
        }
        response.status(200).json(results.rows)
      })
    }
  }

  authenticate_any(token, callback)
}


// Returns user info if login info is valid, returns empty list otherwise
const validateLogin = (request, response) => {
    const email = request.params.email
    const password = request.params.password
    const eth_address = request.params.eth_address
  
    pool.query('SELECT password_hash FROM users WHERE email=$1 AND eth_address=$2', [email, eth_address], (error, results) => {
      if (error) {
        response.status(500).json({ error })
      }
      if (results.rows.length > 0) {
        if (passwordHash.verify(password, results.rows[0].password_hash)){
          pool.query('SELECT * FROM users WHERE email = $1 AND eth_address=$2', [email, eth_address], (error, results) => {
            if (error) {
              response.status(500).json({ error })
            }
            const token = crypto.randomBytes(64).toString('hex')
            pool.query('INSERT INTO auth (token, id) VALUES ($1, $2)', [token, results.rows[0]["id"]], (error, results) => {
              if (error) {
                response.status(500).json({ error })
              }
            })
            var json = results.rows
            json[0]["token"] = token
            response.status(200).json(json)
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
    const token = request.params.token

    const callback = (authenticated) => {
      if (!authenticated){
        response.status(401).send("401 Unauthorized")
      }
      else {
        pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
          if (error) {
            response.status(500).json({ error })
          }
          response.status(200).json(results.rows)
        })
      }
    }

    authenticate(token, id, callback)
      
      
}

// Creates a new user. Needs name, email, password, eth_address, and admin fields. Returns id and token.
const createUser = (request, response) => {
    const { name, email, password, admin, eth_address } = request.body
    const hashedPassword = passwordHash.generate(password);
    
    pool.query('INSERT INTO users (name, email, password_hash, is_admin, eth_address) VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, email, hashedPassword, admin, eth_address], (error, results) => {
      if (error) {
        response.status(500).json({ error })
      }

      try {
        const id = results.rows[0].id
        const token = crypto.randomBytes(64).toString('hex')
        pool.query('INSERT INTO auth (token, id) VALUES ($1, $2)', [token, id], (error, results) => {
          if (error) {
            response.status(500).json({ error })
          }
          json = {}
          json['id'] = id
          json['token'] = token
          response.status(201).send(json)
        })
      } catch (err) {
        response.status(500).json({ err })
      }
      
    })
}

// Updates a user. Needs name, email, password, and admin fields.
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const token = request.params.token
    const {name, email, password, admin, eth_address} = request.body
    const hashedPassword = passwordHash.generate(password);
  
    const callback = (authenticated) => {
      if (!authenticated){
        response.status(401).send("401 Unauthorized")
      }
      else {
        pool.query(
          'UPDATE users SET name = $1, email = $2, password_hash = $3, is_admin = $4, eth_address = $5 WHERE id = $6',
          [name, email, hashedPassword, admin, eth_address, id],
          (error, results) => {
            if (error) {
              response.status(500).json({ error })
            }
            response.status(200).send(`User modified with ID: ${id}`)
          }
        )
      }
    }

    authenticate(token, id, callback)
}

// Deletes a user given id number
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)
  const token = request.params.token

  const callback = (authenticated) => {
    if (!authenticated){
      response.status(401).send("401 Unauthorized")
    }
    else {
      pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
          response.status(500).json({ error })
        }
        response.status(200).send(`User deleted with ID: ${id}`)
      })
    }
  }

  authenticate(token, id, callback)
}

// Sign out
const signOut = (request, response) => {
  const id = parseInt(request.params.id)
  const token = request.params.token

  const callback = (authenticated) => {
    if (!authenticated){
      response.status(401).send("401 Unauthorized")
    }
    else {
      pool.query('DELETE FROM auth WHERE token = $1', [token], (error, results) => {
        if (error) {
          response.status(500).json({ error })
        }
        response.status(200).send(`User signed out with ID: ${id}`)
      })
    }
  }

  authenticate(token, id, callback)
}

module.exports = {validateLogin, getUserById, createUser, updateUser, deleteUser, signOut, getETH, getIDByETH}