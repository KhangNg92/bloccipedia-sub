const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

//#1 We will nest describe calls for the static pages of our application here. 
//The first one will be on our landing page which will serve as the root of our application.
  describe("GET /", () => {

//#2 Our first spec will test that when requesting the server using that route,
// we get a status code 200 indicating that the request was successful.


    it("should return status code 200", (done) => {

//#3 We use request to send a GET request to the base URL. 
//All request making methods take a function as a second argument which will contain the response from the server as well as content and any errors. 
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Blocipedia");
//#4
        done();
      });
    });

  });
});