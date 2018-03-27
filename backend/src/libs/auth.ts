import * as jwt from "jsonwebtoken"
import * as config from "./config"

var JWT_SECRET = config.app.jwt_secret;

async function verifyToken(token) {
    try {
        if (!token) {
            return {
                error: "missing token"
            }
        }
        var result = await jwt.verify(token, JWT_SECRET);
        return result
    } catch (e) {
        console.log(e);
        return {
            error: e.message
        }
    }

}

async function generateToken(obj) {
    var NOW = Date.now() / 1000;
    var DAY = 86400; // the number of seconds in a day
    var payload = {
        iss: "Vu Dang Tu",
        exp: obj.exp || NOW + DAY,
        iat: NOW,
        ...obj
    }
    var token = await jwt.sign(payload, JWT_SECRET);
    return {token,payload};
}

export default {
    verifyToken,
    generateToken
}