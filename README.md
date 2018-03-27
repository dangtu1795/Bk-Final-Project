# Backend
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

    
 
# Frontend
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0.
## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

