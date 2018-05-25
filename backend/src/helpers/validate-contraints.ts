import validator from "./validate-helper"


export const EmailConstraints = [
  {
    check: (variable) => {
      return validator.isEmail(variable + '')
    },
    error: "is not valid."
  }
];

export const NameConstraint = [
  {
    check: (variable) => {
      return validator.isLength(variable + '', {max: 40})
    },
    error: "following are allowed: a-z, A-Z, 0-9, and common punctuation., with a maximum of 40 characters.",
  }
];

export const RoleConstraint = [
  {
    check: validator.isRole,
    error: "is invalid!",
  },
];

export const PhoneConstraints = [
  {
    check: validator.isPhoneNumber,
    error: "is invalid!",
  },
];

export const PasswordConstraint = [
  {
    check: (variable) => {
      return validator.isLength(variable + '', {min: 6, max: 32})
    },
    error: "must have at least 6 characters and maximum of 32 characters",
  },
  {
    check: validator.isAscii,
    error: "following are allowed: a-z, A-Z, 0-9, and common punctuation.",
  }
];

export const NumberConstraints = [
  {
    check: (variable) => {
      return validator.isFloat(variable + '');
    },
    error: "is invalid!",
  },
];

export const DateConstraints = [
  {
    check: (variable) => {
      return validator.isISO8601(variable)
    },
    error: "is not valid ISO 8601 date."
  }
];

export const BoolConstraints = [
  {
    check: (variable) => {
      return validator.isBoolean(variable + '')
    },
    error: "is not valid Boolean"
  }
];

export const ArrayConstraints = [
  {
    check: (variable) => {
      if(typeof variable == "string") return Array.isArray(JSON.parse(variable));
      return Array.isArray(variable)
    },
    error: "is not array."
  }
];

