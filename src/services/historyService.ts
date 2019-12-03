import CaptainsHistory from "../types/CaptainsHistory"
import arrivalDb from "../data/arrivalDb";
import { map } from "../mappers/arrivalsToHistoryMapper";
import ServiceResult from "../types/ServiceResult";

const get: (name: string) => Promise<ServiceResult<CaptainsHistory>> = async (name: string) => {
    const lowercaseName = name.replace(/\+/g, " ").toLowerCase();
    const arrivals = await arrivalDb.get(lowercaseName);
    if (arrivals.length === 0) {
        return { status: "notfound" };
    }

    return { status: "success", payload: map(arrivals) };
};

export default { get }