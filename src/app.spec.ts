import * as supertest from "supertest";
import * as sinon from "sinon";

import app from "./app";
import arrivalDb from "./data/arrivalDb";

const sandbox = sinon.createSandbox();

describe('Arrival', () => {
  const postBody = {
    vessel: "El Tauro",
    datetime: new Date("2056-04-22T18:25:43.511Z"),
    port: "Singapore",
    captain: "Patsy Stone"
  }

  beforeEach(() => {
    const stub = sandbox.stub(arrivalDb)
    stub.save.resolves(Promise.resolve());
  })

  afterEach(() => {
    sandbox.restore();
  })

  it('posts an arrival to the database', () => 
    supertest(app)
      .post('/arrival')
      .send(postBody)
      .expect(204)
  )
})

describe('History', () => {
  const body = {
    captainName: "Patsy Stone",
    trips: [
      {
        vessel: "El Tauro",
        from: "London",
        to: "New York",
        fromDate: "2056-04-22T18:25:43.511Z",
        toDate: "2056-04-25T18:25:43.511Z",
      }
    ]
  };

  const returnedDbArrivals = [{
    vessel: "El Tauro",
    datetime: new Date("2056-04-22T18:25:43.511Z"),
    port: "London",
    captain: "Patsy Stone"
  },
  {
    vessel: "El Tauro",
    datetime: new Date("2056-04-25T18:25:43.511Z"),
    port: "New York",
    captain: "Patsy Stone"
  }];

  let stub;
  
  beforeEach(() => {
    stub = sandbox.stub(arrivalDb)
    stub.get.withArgs("patsy stone").resolves(Promise.resolve(returnedDbArrivals));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('get a captains history from the database', () =>
    supertest(app)
      .get('/history/patsy+stone')
      .expect('Content-Type', /json/)
      .expect(body)
      .expect(200)
  )

  it('returns not found when the captain does not exist', () => {
    stub.get.withArgs("patsy stone").resolves(Promise.resolve([]));
    
    return supertest(app)
      .get('/history/patsy+stone')
      .expect('Content-Type', /json/)
      .expect('{"error":"not found"}')
      .expect(404)
  })
})