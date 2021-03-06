
# Decentralized Health Backend

The backend uses a postgresql database and a node.js API to store and serve data, such as account information and UI files, to the frontend.

## Architecture

The backend implements a Postgresql database and a node.js api. Postgresql is a simple and effective way to quickly boot up and an SQL server on any machine, and node.js keeps the use of javascript consistent throughout the project. Additionally, node.js has helpful API creation libraries such as express.

## Setup

To setup the backend on your machine, follow the relevant set of instructions below:

### Mac OSX
We will use the homebrew tool to install and run our postgresql database. To check if homebrew is installed, use the following command.

    brew

If homebrew is not installed, install it with the following command.

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Next, install postgresql using the following command.

    brew install postgresql

Now, boot up postgresql.

    brew services start postgresql

Now, we need to get our node.JS enviorment up and running. First, check if node.js is installed.

    node -v

If not, run the following homebrew command to install it.

    brew install node

Next, install the required packages.

    npm install pg pgtools express password-hash dotenv

Now, make sure you are in the directory containing the setup_db.js file. Run the following commands.

    export PGDATABASE=health_db PGHOST=localhost PGPORT=5432 PGUSER=$USER PGPASSWORD=password
    node database/setup_db.js
    node database/create_tables.js

Once this is complete, it's time to setup the API. Run the following command.

    node api/index.js

To ensure that the API & database are working, go to a web browser and navigate to the following location. You should see the message "hello world".

    http://localhost:3838/hello

Now, it's time to shut things down. To stop the api, simply terminate the node command with `control-c`. To stop the database, simply run the following command.

    brew services stop postgresql
    
### Windows
Follow this video tutorial for further instructions:  
https://www.youtube.com/watch?v=BLH3s5eTL4Y&t=245s.  
Essentially, just go to postgresql website and hit download.

## Deployment
To deploy the backend on your machine, follow the relevant set of instructions below:

### Mac OSX
Let's boot up our previously set up API and database. To boot up the database, run to following command.

    brew services start postgresql

**Optional:** If you would like to wipe the local database and start fresh, run the following commands.

    export PGDATABASE=health_db PGHOST=localhost PGPORT=5432 PGUSER=$USER PGPASSWORD=password
    node database/create_tables.js

Now, to boot up the api, run the following command.

    node api/index.js

To ensure that the API & database are working, go to a web browser and navigate to the following location. You should see the message "hello world".

    http://localhost:3838/hello

Once you are done working with the API and database, terminate the node command with `control-c`. To stop the database, simply run the following command.

    brew services stop postgresql
    
### Windows 
Follow this video tutorial for further instructions:  
https://www.youtube.com/watch?v=BLH3s5eTL4Y&t=245s.

## Testing
Once the service is up and running, you can run the test suite to ensure proper functionality. To run the test suite, simply navigate to the `api-test` directory and run `npm test`. These tests will only pass if the test user has not been altered. To ensure this is the case, it is recommended to run `node database/create_tables.js` before running the test suite.  
  
This test suite is run automatically upon pushing code to github or initiating a pull request. The GitHub Actions workflow can be viewed or adjusted at `.github/workflows/api-db-test.yml`.

## Authors

Scott Crawshaw  
Tanvir Islam

## Acknowledgments
The following resources were consulted where cited.  
https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/  
https://kb.objectrocket.com/postgresql/how-to-create-a-postgres-database-with-nodejs-844  
https://dirask.com/posts/Node-js-PostgreSQL-Create-table-if-not-exists-DZXJNj  
https://www.postgresqltutorial.com/postgresql-serial/  
https://www.npmjs.com/package/password-hash
https://www.youtube.com/watch?v=BLH3s5eTL4Y&t=245s
