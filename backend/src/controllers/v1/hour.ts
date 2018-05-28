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

export class Hour extends CrubAPI {

    async list(req: Request, res: Response) {
      try {
          let hours = await schemas.HourOfDay.findAll();
          return res.send(ResponseTemplate.success({
              code: ResponseCode.SUCCESS,
              data:hours
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
            let{start, end, day_num} = req.body;
            let hour = await schemas.HourOfDay.create({
                start, end, day_num
            });
            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                hour: hour
            }));
        } catch (e) {
            console.log(e);
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }

    }
}

const hour = new Hour();
module .exports = hour;