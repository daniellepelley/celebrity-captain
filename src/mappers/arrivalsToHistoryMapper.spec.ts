import { map } from './arrivalsToHistoryMapper'
import { expect } from "chai";

describe('arrivalsToHistoryMapper', () => {
  const arrival1 = {
    vessel: "El Tauro",
    datetime: new Date("2056-04-22T18:25:43.511Z"),
    port: "Singapore",
    captain: "Patsy Stone"
  };

  const arrival2 = {
    vessel: "El Tauro",
    datetime: new Date("2056-04-25T14:25:43.511Z"),
    port: "Melbourne",
    captain: "Patsy Stone"
  };

  const arrival3 = {
    vessel: "El Tauro",
    datetime: new Date("2056-04-28T14:25:43.511Z"),
    port: "Hong Kong",
    captain: "Patsy Stone"
  };

  it('maps 2 arrivals', () => {
    const expected = {
      captainName: "Patsy Stone",
      trips: [
        {
          vessel: "El Tauro",
          from: "Singapore",
          to: "Melbourne",
          fromDate: new Date("2056-04-22T18:25:43.511Z"),
          toDate: new Date("2056-04-25T14:25:43.511Z"),
        }
      ]
    };

    const result = map([arrival1, arrival2]);

    expect(result.captainName).to.eql(expected.captainName);
    expect(result.trips[0].vessel).to.eql(expected.trips[0].vessel);
    expect(result.trips[0].from).to.eql(expected.trips[0].from);
    expect(result.trips[0].to).to.eql(expected.trips[0].to);
    expect(result.trips[0].fromDate).to.eql(expected.trips[0].fromDate);
    expect(result.trips[0].toDate).to.eql(expected.trips[0].toDate);
  });

  it('maps 3 arrivals', () => {
    const expected = {
      captainName: "Patsy Stone",
      trips: [
        {
          vessel: "El Tauro",
          from: "Singapore",
          to: "Melbourne",
          fromDate: new Date("2056-04-22T18:25:43.511Z"),
          toDate: new Date("2056-04-25T14:25:43.511Z"),
        },
        {
          vessel: "El Tauro",
          from: "Melbourne",
          to: "Hong Kong",
          fromDate: new Date("2056-04-25T14:25:43.511Z"),
          toDate: new Date("2056-04-28T14:25:43.511Z"),
        },
      ]
    };

    const result = map([arrival3, arrival2, arrival1]);

    expect(result.captainName).to.eql(expected.captainName);
    expect(result.trips[0].vessel).to.eql(expected.trips[0].vessel);
    expect(result.trips[0].from).to.eql(expected.trips[0].from);
    expect(result.trips[0].to).to.eql(expected.trips[0].to);
    expect(result.trips[0].fromDate).to.eql(expected.trips[0].fromDate);
    expect(result.trips[0].toDate).to.eql(expected.trips[0].toDate);

    expect(result.trips[1].vessel).to.eql(expected.trips[1].vessel);
    expect(result.trips[1].from).to.eql(expected.trips[1].from);
    expect(result.trips[1].to).to.eql(expected.trips[1].to);
    expect(result.trips[1].fromDate).to.eql(expected.trips[1].fromDate);
    expect(result.trips[1].toDate).to.eql(expected.trips[1].toDate);
  });

  it('disregards duplicates', () => {
    const expected = {
      captainName: "Patsy Stone",
      trips: [
        {
          vessel: "El Tauro",
          from: "Singapore",
          to: "Melbourne",
          fromDate: new Date("2056-04-22T18:25:43.511Z"),
          toDate: new Date("2056-04-25T14:25:43.511Z"),
        },
        {
          vessel: "El Tauro",
          from: "Melbourne",
          to: "Hong Kong",
          fromDate: new Date("2056-04-25T14:25:43.511Z"),
          toDate: new Date("2056-04-28T14:25:43.511Z"),
        },
      ]
    };

    const result = map([arrival3, arrival2, arrival2, arrival3, arrival1, arrival1, arrival1]);

    expect(result.captainName).to.eql(expected.captainName);
    expect(result.trips[0].vessel).to.eql(expected.trips[0].vessel);
    expect(result.trips[0].from).to.eql(expected.trips[0].from);
    expect(result.trips[0].to).to.eql(expected.trips[0].to);
    expect(result.trips[0].fromDate).to.eql(expected.trips[0].fromDate);
    expect(result.trips[0].toDate).to.eql(expected.trips[0].toDate);

    expect(result.trips[1].vessel).to.eql(expected.trips[1].vessel);
    expect(result.trips[1].from).to.eql(expected.trips[1].from);
    expect(result.trips[1].to).to.eql(expected.trips[1].to);
    expect(result.trips[1].fromDate).to.eql(expected.trips[1].fromDate);
    expect(result.trips[1].toDate).to.eql(expected.trips[1].toDate);
  });

});

