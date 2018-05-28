import {Request, Response} from 'express'
import {CrubAPI} from "../interfaces/CrubAPI";
import ResponseTemplate from "../../helpers/response-template";
import {ResponseCode} from "../../enums/response-code";
import misc from "../../libs/misc";
import {schemas, sequelize} from "../../schemas/index";
import {
    EmailConstraints, PasswordConstraint, NameConstraint,
    PhoneConstraints, RoleConstraint
} from "../../helpers/validate-contraints";
import validateHelper from "../../helpers/validate-helper"

const listConstraints = {
    "email": {
        validates: [...EmailConstraints]
    },
    "password": {
        validates: [...PasswordConstraint]
    },
    "confirm_password": {
        validates: [...PasswordConstraint]
    },
    "name": {
        validates: [...NameConstraint]
    },
    "phone": {
        validates: [...PhoneConstraints]
    },
    "role": {
        validates: [...RoleConstraint]
    },
};

class User extends CrubAPI {
    async list(req: Request, res: Response) {
        try {
            let jwt = (req as any).jwt;
            let listUser = schemas.User.findAll();
            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: listUser,
                user_request: jwt.username
            }));
        } catch (e) {
            res.send(ResponseTemplate.internalError({
                data: null
            }));
        }

    }

    async getProfile(req: Request, res: Response) {
      try {
          let jwt = (req as any).jwt;
          let user = await schemas.User.findByPrimary(jwt.u_id);
          if(!user) {
              return res.send(ResponseTemplate.dataNotFound('user'));
          }
          let profile;
          if(user.role == 'master') {
              profile = await user.getMasterProfile();
          }

          if(user.role == 'student') {
              profile = await user.getStudentProfile();
          }
          return res.send(ResponseTemplate.success({
              code: ResponseCode.SUCCESS,
              data:profile
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
            let {email, password, password_confirm, name, phone, gender, role, overview, student_id, self_introduction, master_id, display_name} = req.body;

            console.log(req.body);
            let valid_item = {email, password, password_confirm, name, phone, role};

            let valid = validateHelper.runValidatingObject(valid_item, listConstraints);
            if (valid) {
                return res.send(ResponseTemplate.error({
                    code: ResponseCode.INPUT_DATA_NULL,
                    message: valid.message,
                    error: {
                        key: valid.key,
                        data: valid.data
                    }
                }));
            }

            if (password !== password_confirm) {
                return res.send(ResponseTemplate.error({
                    code: ResponseCode.DATA_IMPLICIT,
                    message: 'confirm passwornd not match',
                    error: {
                        key: 'password_confirm',
                        data: password_confirm
                    }
                }))
            }

            let checkUser = await schemas.User.findOne({where: {email}});
            if (checkUser) {
                return res.send(ResponseTemplate.error({
                    code: ResponseCode.DATA_UNIQUE_IMPLICIT,
                    message: "email has been taken",
                    error: {
                        key: 'email',
                        data: email
                    }
                }));
            }
            let resUser = await sequelize.transaction(async function (t) {

                let newUser = await schemas.User.create({
                    email, phone, gender, role,
                    password: misc.sha256(password)
                }, {transaction: t});

                if (role == 'master') {
                    let userMaster = await schemas.MasterProfile.create({
                        name, master_id, self_introduction
                    }, {transaction: t});
                    newUser.setMasterProfile(userMaster);
                }

                if (role == 'student') {
                    let userStudent = await schemas.StudentProfile.create({
                        UserId: newUser.id, name, student_id, overview, display_name
                    }, {transaction: t});
                    newUser.setStudentProfile(userStudent);
                }

                let j_user = newUser.toJSON();
                delete j_user.password;

                return new Promise((resolve, reject) => {
                    resolve(j_user);
                });
            });

            return res.send(ResponseTemplate.success({
                code: ResponseCode.SUCCESS,
                data: resUser
            }));
        }
        catch (e) {
            console.log(e);
            return res.send(ResponseTemplate.internalError())
        }

    }
}

const user = new User();
module.exports = user;