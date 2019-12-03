import Arrival from "../types/Arrival";
import CaptainsHistory from "../types/CaptainsHistory";

const mapArrivalPair = (arrival1: Arrival, arrival2: Arrival) => {
    return {
        vessel: arrival1.vessel,
        from: arrival1.port,
        to: arrival2.port,
        fromDate: arrival1.datetime,
        toDate: arrival2.datetime
    };
};

const distinct = (arrivals: Arrival[]) => {
    const dates = arrivals.map(x => x.datetime);

    return arrivals
        .filter((arrival, index) => {
            return dates.indexOf(arrival.datetime) === index;
        })
        .sort((x, y) => x.datetime > y.datetime ? 1 : -1);
};

const mapArrivals = (arrivals: Arrival[]) => {
    const distinctArrivals = distinct(arrivals);

    return Array.from(Array(distinctArrivals.length - 1).keys())
        .map(i => mapArrivalPair(distinctArrivals[i], distinctArrivals[i + 1]));
};

const map: (arrivals: Arrival[]) => CaptainsHistory = (arrivals: Arrival[]) => ({
    captainName: arrivals[0].captain,
    trips: mapArrivals(arrivals)
});

export { map }