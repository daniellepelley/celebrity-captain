import * as mongoose from "mongoose";
import Arrival from "../types/Arrival";
import ArrivalSchema from "./ArrivalSchema";

const ArrivalDb = mongoose.model('arrival', ArrivalSchema);

const map = (arrival: Arrival) => ({ ...arrival, name: arrival.captain.toLocaleLowerCase() });

const save = async (arrival: Arrival) => {
    const arrivalDb = new ArrivalDb(map(arrival));
    await arrivalDb.save();
};

const get = async (name: string) => {
    return await ArrivalDb.find({
        "name": name
    });
};

export default { save, get }