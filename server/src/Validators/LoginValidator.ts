import Joi from "joi";

const LoginValidator = Joi.object({
  username : Joi.string().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false });

export { LoginValidator };
