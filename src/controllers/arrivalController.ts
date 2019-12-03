import * as express from "express";
import arrivalService from "../services/arrivalService";
import Arrival from "../types/Arrival";
import { getResponse } from "../controllers/serviceResultToHttpResponse"

const post = async (req: express.Request, res: express.Response) => {
  try {
    const arrival: Arrival = req.body;
    const result = await arrivalService.post(arrival);
    return getResponse(result, req, res);
  } catch (err) {
    console.error(err);
  }
};

export default { post }