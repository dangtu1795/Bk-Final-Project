## Technology Stack
+ NodeJS
+ Express 4.x
+ Postgres 9.x
+ Typescript 2.x
+ Docker

## How to run
+ `npm install` (`sudo npm install` if linux/osx)
+ `gulp` to test if runable or not
+ `node init_db.js` to create migration and reset data.
+ `node dist/server.js` to run server, or
+ `nodemon dist/server.js` to run & watch


## How to use
+ Modify `config.json` for server config, ex: server port

## Easiest way to run Postgres
+ Using docker:

```
docker run --name postgres \
-e POSTGRES_PASSWORD=123456 \
-p 5432:5432 \
-d mdillon/postgis
```
Using docker to create database:
```
docker exec -it postgres psql -U postgres -c "CREATE DATABASE you_database_here;”
```

One step to define your api: add .ts file in controllers/v1 to define your api. ex: localhost:3000/api/v1/user

Happy Coding.
