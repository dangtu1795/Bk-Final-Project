import {Response, Request} from "express";
import {schemas} from "../../schemas/index";
import {CrubAPI} from "../interfaces/CrubAPI";
import ResponseTemplate from "../../helpers/response-template";
import {ResponseCode} from "../../enums/response-code";
import validateHelper from "../../helpers/validate-helper";
import {requirePermission} from "../../auth/authorization";
const listConstraints = {
    "obj_name": {
        type: "type_name?",
        validates: []
    }
};

export class Course extends CrubAPI {

    async list(req: Request, res: Response) {
        try {
            let jwt = (req as any).jwt;
            let where = {};
            let include = [];
            include.push(
                {model: schemas.Class, required: false},
                {model: schemas.Image, as: 'cover', required: false}
                );
            if(jwt.role == 'master') {
                where['MasterProfileId'] = jwt.p_id
            }

            if(jwt.role == 'student') {
                include.push({
                    model: schemas.MasterProfile,
                    as: 'Master'
                })
            }

            let courses = await schemas.Course.findAll({
                where,
                include
            });
            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: courses
            }));
        } catch (e) {
            console.log(e);
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }

    }

    async search(req: Request, res: Response) {
      try {
          let list_course = await schemas.findAll({
              include: [
                  {model: schemas.Class},
                  {model: schemas.Image, as: 'cover'},
                  {model: schemas.MasterProfile, as: 'Master'}
              ]
          });
          return res.send(ResponseTemplate.success({
              code: ResponseCode.SUCCESS,
              data:null
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
            let {name, description, outline} = req.body;
            let jwt = (req as any).jwt;
            let newCourse = await schemas.Course.create({
                name, description, outline, MasterProfileId: jwt.p_id
            });
            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: newCourse
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
            let course = await schemas.Course.findByPrimary(id, {
                where: {
                    MasterProfileId: jwt.p_id
                },
                include: [
                    {model: schemas.Class, include:[{model: schemas.Schedule}], required: false},
                    {model: schemas.Image, as: 'cover', required: false}
                ]
            });
            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: course
            }));
        } catch (e) {
            console.log(e);
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }

    }
}

const course = new Course();
module.exports = course;