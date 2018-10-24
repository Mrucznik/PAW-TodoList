# hapi-mysql

## To install and build and run project:
- You need server/.env file with parameters:
  - PORT (8080 best)
  - NODE_ENV (development/production)
  - DB_HOST
  - DB_USER
  - DB_PASSWORD
  - DB_DATABASE
  - DB_CHARSET
 - You need to migrate latest database models to your mysql database:
    - npx knex migrate:latest
 - You need to install and start npm project
    - npm install
    - npm start
 - ???
 - Profit
 
## API Documentation
Documentation on swagger: http://localhost:8080/documentation
