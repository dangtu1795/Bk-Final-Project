import auth from "../libs/auth"
import ResponseTemplate from "../helpers/response-template";

var excludePath = [
    "/login"
];

export const authenticate = {
    async isAuthorized(req, res, next) {
        try {
            var baseUrl = req.originalUrl;
            var isSkip = false;
            for (let path of excludePath) {
                if (baseUrl.contains(path)) {
                    isSkip = true;
                    break;
                }
            }

            var token = req.headers.authorization || req.body.token;
            var result = await auth.verifyToken(token);

            if ((req.method == "POST" && baseUrl.endsWith("/user")) || isSkip) {
                return next();
            }

            if (!result || (result as any).error) {
                throw new Error("Verify token fail :" + token);
            }

            req.jwt = result;
            req.token = token;
            return next();

        } catch (e) {
            console.log(e);
            return res.send(ResponseTemplate.accessDenied());
        }
    },
};

export default authenticate;