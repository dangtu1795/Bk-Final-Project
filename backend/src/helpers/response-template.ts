import {ResponseCode} from "../enums/response-code";

export class ResponseTemplate {
  success(obj?: any) {
    return {
      success: true,
      ...obj
    }
  }

  error({code, message, error}) {
    return {
      success: false,
      error: {
        code,
        message,
        data: error
      }
    }
  }

  accessDenied(message?: any, data?: any) {
    return {
      success: false,
      error: {
        code: ResponseCode.PERMISSION_IMPLICIT,
        message: message || 'Access denied',
        data: data
      }
    }
  }

  dataNotFound(name, data = null) {
    return {
      success: false,
      error: {
        message: `${name} not found`,
        code: ResponseCode.DATA_NOT_FOUND,
        data: {
            message: `${name} not found`,
            key: Object.keys(data)[0],
            data: data[Object.keys(data)[0]]
        }
      }
    }
  }

  inputNullImplicit(field) {
    return {
      success: false,
      error: {
        message: `${field} cannot be empty`,
        code: ResponseCode.INPUT_DATA_NULL,
        error: {
            message: `${field} cannot be empty`,
            key: field,
            data: null
        }
      }
    }
  }

  internalError(message?: any, data?: any) {
    return {
      success: false,
      error: {
        code: ResponseCode.SERVER_INTERNAL_ERROR,
        message: message || 'Server internal error',
        data: data
      }
    }
  }
}
const responseTemplate = new ResponseTemplate();
export default responseTemplate;
