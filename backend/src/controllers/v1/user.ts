import {Request, Response} from 'express'
import {CrubAPI} from "../interfaces/CrubAPI";
import ResponseTemplate from "../../helpers/response-template";
import {ResponseCode} from "../../enums/response-code";
import misc from "../../libs/misc";
import {schemas} from "../../schemas/index";
import {
    EmailConstraints, PasswordConstraint, NameConstraint,
    PhoneConstraints, RoleConstraint
} from "../../helpers/validate-contraints";
import validateHelper from "../../helpers/validate-helper"

const listConstraints = {
    "email": {
        validates: [...EmailConstraints]
    },
    "password": {
        validates: [...PasswordConstraint]
    },
    "confirm_password": {
        validates: [...PasswordConstraint]
    },
    "name": {
        validates: [...NameConstraint]
    },
    "phone": {
        validates: [...PhoneConstraints]
    },
    "role": {
        validates: [...RoleConstraint]
    }
};

class User extends CrubAPI {
    async list(req: Request, res: Response) {
        try {
            let jwt = (req as any).jwt;
            let listUser = schemas.User.findAll();
            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: listUser,
                user_request: jwt.username
            }));
        } catch (e) {
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }

    }

    async create(req: Request, res: Response) {
        try {
            let {email, password, password_confirm, name, phone, gender, role} = req.body;

            let valid_item = {};
            for (let key of Object.keys(req.body)) {
                if (req.body[key] != null && req.body[key] != undefined && listConstraints[key]) {
                    valid_item[key] = req.body[key];
                }
            }

            let valid = validateHelper.runValidatingObject(valid_item, listConstraints);
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

            if (password !== password_confirm) {
                return res.send(ResponseTemplate.error({
                    code: ResponseCode.DATA_IMPLICIT,
                    message: 'confirm passwornd not match',
                    error: {
                        key: 'password_confirm',
                        data: password_confirm
                    }
                }))
            }

            let checkUser = await schemas.User.findOne({where: {email}});
            if (checkUser) {
                return res.send(ResponseTemplate.error({
                    code: ResponseCode.DATA_UNIQUE_IMPLICIT,
                    message: "email has been taken",
                    error: {
                        key: 'email',
                        data: email
                    }
                }));
            }

            let user = await schemas.User.create({
                email, name, phone, gender, role,
                password: misc.sha256(password)
            });

            let j_user = user.toJSON();
            delete j_user.password;

            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: user
            }));
        }
        catch (e) {
            console.log(e);
            return res.send(ResponseTemplate.internalError())
        }

    }
}

const user = new User();
module.exports = user;