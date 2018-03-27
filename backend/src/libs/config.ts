let fs = require('fs');
let path = require('path');
let configFile = process.env.CONFIG || path.join(__dirname, '../config.json');
const config = JSON.parse(fs.readFileSync(configFile));

export = config;