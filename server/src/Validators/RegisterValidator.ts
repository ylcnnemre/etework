import joi from "joi";

const registerValidator = joi.object({
  username: joi.string().required().min(3).max(50).alphanum(),
  email : joi.string().required().email(),
  password: joi.string().min(3).max(50).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
}).options({abortEarly:false});

export { registerValidator };
