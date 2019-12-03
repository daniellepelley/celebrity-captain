import * as express from "express";
import * as bodyParser from "body-parser";

import arrivalController from "./controllers/arrivalController";
import historyController from "./controllers/historyController";

import middleware from "./validation/validationMiddlerware";
import schemas from "./validation/schemas";

const app = express();
app.use(bodyParser.json());

app.get("/health", (req, res) => res.send("ok"));
app.post("/arrival", middleware(schemas.arrvialPOST), arrivalController.post);
app.get("/history/:name", historyController.get);

export default app;
