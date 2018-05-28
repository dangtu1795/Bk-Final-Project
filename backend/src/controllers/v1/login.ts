import {CrubAPI} from "../interfaces/CrubAPI";
import ResponseTemplate from "../../helpers/response-template";
import {Request, Response} from "express"
import {ResponseCode} from "../../enums/response-code";
import {schemas} from "../../schemas/index";
import auth from "../../libs/auth"
import misc from "../../libs/misc";
import validateHelper from "../../helpers/validate-helper"
import {PasswordConstraint, EmailConstraints} from "../../helpers/validate-contraints";

const listConstraints = {
    "email": {
        validates: [...EmailConstraints]
    },
    "password": {
        validates: [...PasswordConstraint]
    },
};

class Login extends CrubAPI {
    async create(req: Request, res: Response) {
        try {
            let {email, password} = req.body;
            let valid = validateHelper.runValidatingObject({email, password}, listConstraints);
            if (valid) {
                return res.send(ResponseTemplate.error({
                    code: ResponseCode.INPUT_DATA_NULL,
                    message: valid.message,
                    error: {
                        key: valid.key,
                        data: valid.data
                    }
                }));
            }

            let user = await schemas.User.findOne({
                where: {email}
            });
            if (!user) {
                return res.send(ResponseTemplate.error({
                        code: ResponseCode.DATA_NOT_FOUND,
                        message: "email not found",
                        error: {
                            key: 'email',
                            data: email
                        }
                    }
                ));
            }
            if(user.password !== misc.sha256(password)){
                return res.send(ResponseTemplate.error({
                        code: ResponseCode.DATA_NOT_FOUND,
                        message: "wrong password",
                        error: {
                            key: 'password',
                            data: password
                        }
                    }
                ));
            }

            let profile;
            if(user.role == 'master') {
                profile = await user.getMasterProfile();
                console.log('profile',profile)
            }

            if (user.role == 'student') {
                profile = await user.getStudentProfile()
            }

            let j_user = user.toJSON();
            delete j_user.password;

            let jwt = await auth.generateToken({
                u_id: j_user.id,
                email: j_user.email,
                f_id: j_user.facultyId,
                m_id: j_user.majorId,
                p_id: profile && profile.id,
                role: j_user.role
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