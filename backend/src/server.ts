require('app-module-path').addPath(__dirname);
require('source-map-support').install();
import * as config from "./libs/config"
import App from './App';
import {sequelize} from "./schemas";
declare var global: any;

var Socket = require('socket.io');
var socketRoute = require('./sockets/route');

let app = new App({
    port: config.server.port,
});

// Socket.IO "Routes"
var io = Socket(app.server);
io.of('/').on('connection', socketRoute);

sequelize.sync().then(() => {
    global.__dbReady = true;
}).catch(e => {
    console.error("Cannot connect to database", e);
});