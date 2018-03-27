import {authenticate} from "../auth"
import * as v1 from '../controllers/v1';
var express = require("express");


let routes = express.Router();
routes.use(authenticate.isAuthorized);

for (let key of Object.keys(v1)) {
    let api = v1[key];

    routes.get(`/${key}`, api.list);
    routes.post(`/${key}`, api.create);
    routes.put(`/${key}:id?`, api.update);
    routes.get(`/${key}:id`, api.retrieve);
    routes.delete(`/${key}:id?`, api.destroy);

}

module.exports = routes;