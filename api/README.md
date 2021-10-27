# API

## Purpose
The API provides a connection between the frontend and the database. It contains functions that can be employed to write, read, update, and delete data from the database.

## Endpoints
If the API is running on your local machine, all endpoints will likely exist at http://localhost:3838.
### Default
The `/` endpoint responds with a simple message. This endpoint can be used to ensure that the API is working. Example: `http://localhost:3838/`

### Hello World
The `/hello` GET endpoint responds with a hello world message from the database. This endpoint can be used to ensure that both the API and the database are working. Example: `http://localhost:3838/hello`

### Get User by ID
The `/users/:id` GET endpoint returns information about a user, given the user's ID. Example: `http://localhost:3838/users/1`

### Validate Login
The `/users/:email/:password` GET endpoint will return user information if the provided email and password are correct. It will return an empty list if they are not. Example: `http://localhost:3838/users/johnsmithcs98health%40gmail.com/password`

### Create User
The `/users` POST endpoint will create a new user with the provided information. The following fields must be included in the body of the request: name, email, password, and admin. Example: `curl --data "name=Elaine&email=elaine@example.com&password=beebus&admin=0" http://localhost:3838/users`

### Update User
The `/users/:id` PUT endpoint will update user information. The following fields must be included in the body of the request: name, email, password, and admin. Example: `curl -X PUT -d "name=Kramer" -d "email=kramer@example.com" -d "admin=0" -d "password=beebus" http://localhost:3838/users/2`

### Delete User
The `/users/:id` DELETE endpoint will delete a given user based on ID. Example: `curl -X "DELETE" http://localhost:3838/users/2`

## Author
Scott Crawshaw '22