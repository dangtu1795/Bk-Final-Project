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

export class Faculty extends CrubAPI {
    async create(req: Request, res: Response) {
        try {
            let {name, foundation_date, phone, website, email, overview} = req.body;
            let exist = await schemas.Faculty.findOne({
                where: {
                    name: name.toLowerCase().trim()
                }
            });
            if (exist) {
                return res.send(ResponseTemplate.error({
                    code: ResponseCode.DATA_IMPLICIT,
                    message: 'Faculty already existed.',
                    error: {}
                }))
            }

            let new_faculty = await schemas.Faculty.create({
                name: name.toLowerCase().trim(),
                foundation_date: Date.parse(foundation_date),
                phone, website, email, overview
            });

            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: new_faculty
            }));
        } catch (e) {
            console.log(e);
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }

    }

    async list(req: Request, res: Response) {
        try {
            let list_faculty = await schemas.Faculty.findAll({
                include: [{model: schemas.Major}]
            });
            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: list_faculty
            }));
        } catch (e) {
            console.log(e);
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }
    }

    async retrieve(req: Request, res: Response) {
        try {
            let id = req.params.id;
            let faculty = await schemas.Faculty.findByPrimary(id);
            if(!faculty) {
                return res.send(ResponseTemplate.dataNotFound('faculty'))
            }
            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: faculty
            }));
        } catch (e) {
            console.log(e);
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }

    }
}

const faculty = new Faculty();
module.exports = faculty;