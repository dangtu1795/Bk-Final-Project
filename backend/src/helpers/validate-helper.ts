import * as validator from "validator";

const VIETNAME_PHONE_NUMBER_REGEX = /^(01[2689]|09)[0-9]{8}$/;
const VALID_ROLE = ['admin', 'student', 'master']

export class ValidateModel {
  check: (varialbe: any) => boolean;
  error: string;
}

export class Constraint {
  type?: string;
  validates: Array<ValidateModel>;
}

export default {
  ...validator,

  isRole(str) {
    return VALID_ROLE.indexOf(str) > -1;
  },

  isPhoneNumber(str) {
    return (VIETNAME_PHONE_NUMBER_REGEX.test(str));
  },

  runValidating(variable, contraints: Constraint) {
    if (!contraints) {
      return null;
    }

    if (contraints.type) {
      console.log(contraints.type);
      if (typeof variable !== contraints.type) {
        return `must have type is ${contraints.type}`;
      }
    }

    for (let validateFunc of contraints.validates) {
      if (!validateFunc.check(variable)) {
        return validateFunc.error;
      }
    }

    return null;
  },

  runValidatingObject(obj, listContraintOfObject){
    for (let key of Object.keys(obj)) {
      if (listContraintOfObject.hasOwnProperty(key)) {
        let contraints = listContraintOfObject[key];
        let hasError = this.runValidating(obj[key], contraints);
        if (hasError) {
          return {
            key: key,
            message: key + ' ' + hasError,
            data: obj[key]
          }
        }
      }

      if (obj[key] == null || obj[key] === undefined || obj[key] === "") {
        return {
          key: key,
          message: key + ' can not be empty.',
          data: obj[key]
        }
      }
    }

    return null
  },

}

