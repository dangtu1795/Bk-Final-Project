import * as path from "path"

require('fs').readdirSync(__dirname).filter((file: string) => {
    return path.extname(file) != ".map" && file[0] != ".";
}).forEach(function (file) {
    if (file === 'index.js') return;
    module.exports[path.basename(file, '.js')] = require(path.join(__dirname, file));
});