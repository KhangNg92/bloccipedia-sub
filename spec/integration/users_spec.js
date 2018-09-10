const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

  beforeEach((done) => {

    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
     console.log(err);
      done();
    });

  });

  describe("GET /users/sign_up", () => {

    it("should render a view with a sign up form", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Welcome to Blocipedia");
        done();
      });
    });
  });

  describe("POST /users", () => {

    // Confirm that a form with valid values creates a user. 
    it("should create a new user with valid values and redirect", (done) => {

      const options = {
        url: base,
        form: {
	        username: "user_name",
          email: "user@example.com",
          password: "123456789",
          password_conf: "123456789"
        }
      }

      request.post(options,
        (err, res, body) => {

          // Check the users table for a user with the given email and confirm ID  
          console.log(err);
          User.findOne({where: {email: "user@example.com"}})
          .then((user) => {
            expect(user).not.toBeNull();  
            expect(user.email).toBe("user@example.com");
            expect(user.id).toBe(1);
            done(); 
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

    // Confirm that a form with invalid values does not create a new user 
    it("should not create a new user with invalid attributes and redirect", (done) => {
      request.post(
        {
          url: base,
          form: {
	        username: "wrong_user",
            email: "wrong",
            password: "12345678910"
          }
        },
        (err, res, body) => {
          User.findOne({where: {email: "wrong"}})
          .then((user) => {
            expect(user).toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("GET /users/sign_in", () => {

    it("should render a view with a sign in form", (done) => {
      request.get(`${base}sign_in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign in");
        done();
      });
    });

  });
});