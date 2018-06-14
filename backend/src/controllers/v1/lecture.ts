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

export class Lecture extends CrubAPI {

    async create(req: Request, res: Response) {
        try {
            let jwt = (req as any).jwt;
            let {class_id, course_id, videoUrl, slideUrl, title} = req.body;

            let user = await schemas.User.findByPrimary(jwt.u_id);
            let exist_class = await schemas.Class.findByPrimary(class_id);
            if (!user || !exist_class) {
                return res.send(ResponseTemplate.dataNotFound('data'))
            }

            let newLecture = await schemas.Lecture.create({
                videoUrl, slideUrl, title
            });

            await exist_class.addLecture(newLecture);

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

    async retrieve(req: Request, res: Response) {
        try {
            let id = req.params.id;
            let jwt = (req as any).jwt;
            let {class_id} = req.query;
            let profile = await schemas.StudentProfile.findByPrimary(jwt.p_id);
            if(!profile) {
                return res.send(ResponseTemplate.dataNotFound('user'));
            }

            let classes = await profile.getClasses({
                where: {id: class_id},
                include: [{model: schemas.Lecture, where:{id}}]
            });

            if(classes.length == 0) {
                return res.send(ResponseTemplate.dataNotFound('class'));
            }

            let lecture = classes[0].Lectures[0];

            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: lecture
            }));
        } catch (e) {
            console.log(e);
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }

    }
}

const lecture = new Lecture();
module.exports = lecture;