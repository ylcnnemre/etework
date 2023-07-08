import joi from "joi";

export const companySaveValidate = joi.object({
    companyName : joi.string().required(),
    registrationNumber :joi.number().required(),
    country : joi.string().alphanum().required(),
    website : joi.string().required()
}).options({abortEarly : false})
