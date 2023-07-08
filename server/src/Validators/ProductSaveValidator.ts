import Joi from "joi";

export const productSaveValidator=Joi.object({
    productName : Joi.string().required(),
    category : Joi.string().required(),
    quantity : Joi.number().required(),
    unit :  Joi.string().required(),
    company : Joi.string().required()
})

