import * as Joi from "joi";
const schemas = {
    arrivalPOST: Joi.object().keys({
        vessel: Joi.string().required(),
        datetime: Joi.date().required(),
        port: Joi.string().required(),
        captain: Joi.string().required()
    })
};

export default schemas;