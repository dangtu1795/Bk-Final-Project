import {CrubAPI} from "../interfaces/CrubAPI";
import ResponseTemplate from "../../helpers/response-template";
import {Request, Response} from "express"
import {ResponseCode} from "../../enums/response-code";
import {schemas} from "../../schemas/index";
import auth from "../../libs/auth"
import misc from "../../libs/misc";


class Login extends CrubAPI {
    async create(req: Request, res: Response) {
        try {
            let {email, password} = req.body;
            let user = await schemas.User.findOne({
                where: {email}
            });gu
            if (!user) {
                return res.send(ResponseTemplate.error({
                        code: ResponseCode.DATA_NOT_FOUND,
                        message: "email not found",
                        error: null
                    }
                ));
            }
            if(user.password !== misc.sha256(password)){
                return res.send(ResponseTemplate.error({
                        code: ResponseCode.DATA_NOT_FOUND,
                        message: "email not found",
                        error: null
                    }
                ));
            }

            let j_user = user.toJSON();
            delete j_user.password;

            let jwt = await auth.generateToken({
                u_id: user.id,
                username:j_user.email
            });


            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                token: (jwt as any).token,
                data: j_user
            }));
        }
        catch (e) {
            console.log(e.message);
            return res.send(ResponseTemplate.internalError())
        }
    }

}

const login = new Login();
module.exports = login;