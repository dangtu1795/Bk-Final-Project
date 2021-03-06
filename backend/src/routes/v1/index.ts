import {authenticate} from "../../auth/authenticate";
var express = require('express');
require('../../libs/extend');
var router = express.Router();
import * as v1 from "../../controllers/v1";

router.use(authenticate.isAuthorized);
router.get('/user/profile', (v1 as any).user.getProfile);
router.post("/token/check", (v1 as any).token.checkToken);
router.get("/class/request/:id", (v1 as any).class.requestJoin);
router.post("/class/request", (v1 as any).class.eliminate);
router.get("/class/me", (v1 as any).class.getAllClass);

let ignores = ["default"];
for (let key of Object.keys(v1)) {
    if (ignores.contains(key))
        continue;
    let api = v1[key];
    router.get(`/${key}`, api.list);
    router.get(`/${key}/:id`, api.retrieve);
    router.post(`/${key}`, api.create);
    router.put(`/${key}/:id?`, api.update);
    router.delete(`/${key}/:id?`, api.destroy);
}

module.exports = router;
