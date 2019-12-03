import * as express from "express";
import historyService from "../services/historyService";
import { getResponse } from "../controllers/serviceResultToHttpResponse"

const get = async (req: express.Request, res: express.Response) => {
    try {
        const name: string = req.params.name;
        const result = await historyService.get(name);
        return getResponse(result, req, res);
    } catch (err) {
        console.error(err);
    }
};

export default { get }