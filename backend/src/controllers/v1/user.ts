import {Request, Response} from 'express'
import {CrubAPI} from "../interfaces/CrubAPI";
import ResponseTemplate from "../../helpers/response-template";
import {ResponseCode} from "../../enums/response-code";
import misc from "../../libs/misc";
import {schemas} from "../../schemas/index";

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
            let {email, password, name, phone, gender, role} = req.body;
            if (!email || !password) {
                res.send(ResponseTemplate.error({
                    code: ResponseCode.DATA_NOT_FOUND,
                    message: "Missing data",
                    error: null
                }));
            }

            let checkUser = await schemas.User.findOne({where: {email}});
            if (checkUser) {
                return res.send(ResponseTemplate.error({
                    code: ResponseCode.DATA_UNIQUE_IMPLICIT,
                    message: "email has been taken",
                    error: null
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