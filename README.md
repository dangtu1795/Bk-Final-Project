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

    
 
1
# Frontend
2
​
3
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0.
4
​
5
## Development server
6
​
7
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
8
​
9
## Code scaffolding
10
​
11
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
12
​
13
## Build
14
​
15
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
16
​
17
## Running unit tests
18
​
19
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
20
​
21
## Running end-to-end tests
22
​
23
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
24
​
25
## Further help
26
​
27
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
28
​
@dangtu1795
Commit changes

Update README.md

Add an optional extended description…
  Commit directly to the master branch.
  Create a new branch for this commit and start a pull request. Learn more about pull requests.
 
© 2018 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About
Press h to open a hovercard with more details.
