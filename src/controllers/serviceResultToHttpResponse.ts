import ServiceResult from "../types/ServiceResult";
import { Request, Response } from "express";

const getResponse = <T>(serviceResult: ServiceResult<T>, req: Request, res: Response) =>  {
    switch(serviceResult.status) {
        case "success":
            const statusCode = req.method === "POST" ? 204 : 200;
            return res.status(statusCode).json(serviceResult.payload);
        case "notfound":
            return res.status(404).json({ error: "not found"});
        default:
            return res.status(500).json();
    }
}

export { getResponse };