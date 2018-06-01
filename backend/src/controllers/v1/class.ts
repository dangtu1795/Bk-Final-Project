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
            let exist_class = await schemas.Class.findByPrimary(id);
            if(!exist_class || !user) {
                return res.send(ResponseTemplate.dataNotFound('data'))
            }
            let res_class = exist_class.toJSON();
            let members = await exist_class.getMembers({
                attributes:['name', 'overview', 'display_name', 'student_id']
            });
            res_class.member_num = members.length;
            if(user.role == 'student') {
                let profile = await user.getStudentProfile();
                let classes = await profile.getClasses({
                    where: {id: id}
                });

                if(classes.length) {
                    res_class.joined = true;
                    let lectures = await exist_class.getLectures();
                    res_class.Lectures = lectures;
                } else {
                    res_class.joined = false;
                }
            }

            if(user.role == 'master') {
                let lectures = await exist_class.getLectures();
                res_class.Lectures = lectures;
                res_class.Members = members.map(x => {
                    x = x.toJSON();
                    delete x.ClassMembers;
                    return x;
                });
            }
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

    async requestJoin(req: Request, res: Response) {
        try {
            let id = req.params.id;
            let jwt = (req as any).jwt;
            let user = await schemas.User.findByPrimary(jwt.u_id);
            let exist_class = await schemas.Class.findByPrimary(id);
            if(!user || !exist_class) {
                return res.send(ResponseTemplate.dataNotFound('data'))
            }
            let members = await exist_class.getMembers();
            if(members.length == exist_class.capacity) {
                return res.send(ResponseTemplate.error({
                    code: ResponseCode.DATA_NOT_AVAILABLE,
                    message: "class is full!",
                    error: {}
                }))
            }

            let profile = await user.getStudentProfile();

            await exist_class.addMember(profile);
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

    async getAllClass(req: Request, res: Response) {
        try {
            let jwt = (req as any).jwt;
            let user = await schemas.User.findByPrimary(jwt.u_id);
            if(!user) {
                return res.send(ResponseTemplate.dataNotFound('user'))
            }
            let profile = await user.getStudentProfile();
            let myClass = await profile.getClasses({
                include: [
                    {model: schemas.Schedule, include: [{model: schemas.HourOfDay, as: 'hours'}]}
                ]
            });

            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: myClass
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