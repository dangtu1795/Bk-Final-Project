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
    async list(req: Request, res: Response) {
      try {
          let {slideUrl, videoUrl, isUpdate} = req.query;
          console.log(slideUrl, videoUrl, isUpdate);
          let lecture = await schemas.Lecture.findAll();
          if(isUpdate) {
              if(!slideUrl || !videoUrl) {
                  return res.send(ResponseTemplate.error({
                      code: ResponseCode.INPUT_DATA_NULL,
                      message: 'you must send both videoUrl and slideUrl',
                      error: {slideUrl, videoUrl}
                  }))
              }

              if(lecture.length == 0) {
                  lecture = await schemas.Lecture.create({
                      title: 'First Lecture',
                      slideUrl, videoUrl
                  })
              } else {
                  lecture = lecture[0];
                  await lecture.update({
                      slideUrl, videoUrl
                  })
              }
          } else {
            lecture = lecture[0]
          }

          return res.send(ResponseTemplate.success({
              code: ResponseCode.SUCCESS,
              data:lecture
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
            let jwt = (req as any).jwt;
            let {class_id, course_id, videoUrl, slideUrl, title} = req.body;

            let user = await schemas.User.findByPrimary(jwt.u_id);
            let exist_class = await schemas.Class.findByPrimary(class_id);
            if(!user || !exist_class) {
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
}

const lecture = new Lecture();
module.exports = lecture;