import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as debug from 'debug';
import * as cookieParser from 'cookie-parser';
import * as session from "express-session";
var upload = require('multer')({dest: 'public/uploads/'}).any();

var port;
require("./libs/extend");

// Creates and configures an ExpressJS web server.
export default class App {

    // ref to Express instance
    public express: express.Application;
    public server = http.Server;

    //Run configuration methods on the Express instance.
    constructor(options) {
        this.express = express();
        this.middleware(options);
        this.routes(options);
        this.initServer(options);
    }

    // Configure Express middleware.
    private middleware(options): void {
        this.express.use(acceptCors);
        this.express.use(logger('dev'));
        this.express.use(upload);
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(cookieParser());
        this.express.use(session({secret: 'BKE@2018', cookie: {maxAge: 60 * 60000}}));
    }


    private routes(options): void {
        // placeholder route handler
        var router = require('./routes/index');
        this.express.use('/', router);
        this.express.use(express.static(path.join(__dirname, 'public')));
    }

    private initServer(options) {
        const port = normalizePort(options.port);
        this.express.set('port', port);
        console.log("Server listening on:" + port);

        this.server = http.createServer(this.express);
        this.server.listen(port);
        this.server.on('error', onError);
        this.server.on('listening', onListening());
    }

}

function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    console.log(error);
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {

    return function () {
        let server = this;
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        debug(`Listening on ${bind}`);
    }
}

function acceptCors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTION");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
}
