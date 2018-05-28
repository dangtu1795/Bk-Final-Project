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

export class Classes extends CrubAPI {

    async list(req: Request, res: Response) {
        try {
            let jwt = (req as any).jwt;
            let classes
            let user = await schemas.findByPrimary(jwt.u_id);
            if(user.role != 'student') {
                return res.send(ResponseTemplate.accessDenied());
                let profile = await user.getStudentProfile();
                classes = profile.getClass();
            }


            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: classes
            }));
        } catch (e) {
            console.log(e);
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }

    }

    async create(req: Request, res: Response) {
        try {
            let {name, note, capacity, CourseId, hours, from, to} = req.body;
            let newClass = await schemas.Class.create({
                name, capacity, note, CourseId
            });

            let schedule = await schemas.Schedule.create({
                title: newClass.name,
                from: Date.parse(from),
                to: Date.parse(to)

            });
            await schedule.addHours(hours);
            await newClass.setSchedule(schedule);

            let res_class = await schemas.Class.findByPrimary(newClass.id, {
                include: [
                    {model: schemas.Schedule},
                ]
            });

            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: res_class
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
            let jwt = (req as any).jwt;
            let user = await schemas.User.findByPrimary(jwt.u_id);
            if(user.role == 'student') {
                let profile = await user.getStudentProfile();
                let classes = await profile.getClasses({
                    where: {id: id},
                    include: [{model: schemas.Lecture, required: false}]
                });
                if(!classes.length) {
                    return res.send(ResponseTemplate.dataNotFound('class'))
                }

                return res.send(ResponseTemplate.success({
                    code: ResponseCode.SUCCESS,
                    data: classes[0]
                }))
            }
            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
            }));
        } catch (e) {
            console.log(e);
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }

    }
}

const classes = new Classes();
module.exports = classes;