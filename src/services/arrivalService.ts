import ServiceResult from "../types/ServiceResult"
import arrivalDb from "../data/arrivalDb";
import Arrival from "../types/Arrival";

const post: (arrival: Arrival) => Promise<ServiceResult<any>> = async (arrival: Arrival) => {
    try {
        console.log("post");
        await arrivalDb.save(arrival);
        return { status: "success", payload: null }
    }
    catch(ex) {
        console.log(ex);
    }
};

export default { post }