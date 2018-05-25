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
}

const lecture = new Lecture();
module.exports = lecture;