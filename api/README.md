# API

## Purpose
The API provides a connection between the frontend and the database. It contains functions that can be employed to write, read, update, and delete data from the database.

## Authentication
Authentication is performed using a bearer token. When a user logs in or creates an account, a token is issued. This token is stored on the client side and included in requests to the API. This token is only valid for making requests that pertain to the correct user. The token expires after 48 hours, at which point the user must log in again. The tokens themselves are generated via the `crypto` library, but the authentication procedures are coded from scratch, and do not make use of any libraries.

## Endpoints
If the API is running on your local machine, all endpoints will likely exist at http://localhost:3838.

### Default
The `/` endpoint responds with a simple message. This endpoint can be used to ensure that the API is working. Example: `http://localhost:3838/`

### Hello World
The `/hello` GET endpoint responds with a hello world message from the database. This endpoint can be used to ensure that both the API and the database are working. Example: `http://localhost:3838/hello`

### Get User by ID
The `/users/:token/:id` GET endpoint returns information about a user, given the user's ID. Example: `http://localhost:3838/users/8d50a388f44915f44dda067276722595f885aacc01e26d4eb3f7495a8d477a4d787bd4277ab46fb31cb0db4837ca8da1de8987ad03dc158709036e6fd1c84aa9/1`

### Validate Login
The `/users/login/:email/:password` GET endpoint will return user information if the provided email and password are correct. It will return an empty list if they are not. Example: `http://localhost:3838/users/login/johnsmithcs98health%40gmail.com/password`

### Create User
The `/users` POST endpoint will create a new user with the provided information. The following fields must be included in the body of the request: name, email, password, and admin. Example: `curl --data "name=Elaine&email=elaine@example.com&password=beebus&admin=0" http://localhost:3838/users`

### Update User
The `/users/:token/:id` PUT endpoint will update user information. The following fields must be included in the body of the request: name, email, password, and admin. Example: `curl -X PUT -d "name=Kramer" -d "email=kramer@example.com" -d "admin=0" -d "password=password" http://localhost:3838/users/8d50a388f44915f44dda067276722595f885aacc01e26d4eb3f7495a8d477a4d787bd4277ab46fb31cb0db4837ca8da1de8987ad03dc158709036e6fd1c84aa9/1`

### Delete User
The `/users/:token/:id` DELETE endpoint will delete a given user based on ID. Example: `curl -X "DELETE" http://localhost:3838/users/8d50a388f44915f44dda067276722595f885aacc01e26d4eb3f7495a8d477a4d787bd4277ab46fb31cb0db4837ca8da1de8987ad03dc158709036e6fd1c84aa9/1`

## Author
Scott Crawshaw '22