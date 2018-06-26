import {Response, Request} from "express";
import {schemas} from "../../schemas/index";
import {CrubAPI} from "../interfaces/CrubAPI";
import ResponseTemplate from "../../helpers/response-template";
import {ResponseCode} from "../../enums/response-code";
import validateHelper from "../../helpers/validate-helper";
const listConstraints = {
    "obj_name": {
        type: "type_name?",
        validates: []
    }
};

export class Major extends CrubAPI {
    async create(req: Request, res: Response) {
        try {
            let {name, overview, facultyId} = req.body;
            let exist = await schemas.Major.findOne({
                where: {
                    facultyId: facultyId,
                    name: name.toLowerCase().trim()
                }
            });
            if(exist) {
                return res.send(ResponseTemplate.error({
                    code: ResponseCode.DATA_IMPLICIT,
                    message: 'Major already existed.',
                    error: {}
                }))
            }

            let new_major = await schemas.Major.create({
                name: name.toLowerCase().trim(), overview, facultyId
            });
            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: new_major
            }));
        } catch (e) {
            console.log(e);
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }

    }


}

const major = new Major();
module.exports = major;