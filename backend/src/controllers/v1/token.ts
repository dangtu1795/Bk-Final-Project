import { Request, Response } from "express";
import { CrubAPI } from "../interfaces/CrubAPI";
import auth from "../../libs/auth";
import { ResponseCode } from "enums/response-code";
import ResponseTemplate from "helpers/response-template";


class Token extends CrubAPI {

    async checkToken(req: Request, res: Response) {
        try {
            let { token } = req.body;

            let check = await auth.verifyToken(token);

            if (!check || (check as any).error) {
                return res.send(ResponseTemplate.error({
                    code: ResponseCode.TOKEN_NOT_VALID,
                    message: "Token is not valid",
                    error: { token }
                }));
            }

            return res.send(ResponseTemplate.success({
                message: "Token is valid",
                data: { token }
            }));
        } catch (e) {
            console.error(e);
            return res.send(ResponseTemplate.error({
                code: ResponseCode.SERVER_INTERNAL_ERROR,
                message: 'Server internal error',
                error: e
            }));
        }

    }
}

const token = new Token();
module.exports = token;
