# hapi-mysql

## To install and build and run project:
- You need server/.env file with parameters (you must fill it with proper values):
  - PORT - 8080 best
  - NODE_ENV - development/production
  - DB_HOST
  - DB_USER
  - DB_PASSWORD
  - DB_DATABASE
  - DB_CHARSET
  - APP_SECRET - secret phrase for jwt token
 - You need to migrate latest database models to your mysql database (if you don't have tables in your database):
    - npx knex migrate:latest
 - You need to install and start npm project
    - npm install
    - npm start (In case problems with migrations - run npm start as administrator)
 - ???
 - Profit
 
## API Documentation
Documentation on swagger: http://localhost:8080/documentation
