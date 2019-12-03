import * as Joi from "joi";
import { Request, Response } from "express";
import { ValidationErrorItem } from "joi";

const middleware = (schema: Joi.SchemaLike) => {
    return (req: Request, res: Response, next: () => void) => {
        const { error } = Joi.validate(req.body, schema);

        if (error == null) {
            next();
        } else {
            const { details } = error;
            const message = details.map((i: ValidationErrorItem) => i.message).join(',');

            console.log("error", message);
            res.status(422).json({ error: message })
        }
    }
}

export default middleware;