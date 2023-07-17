const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const index = require("../index");
const clearDatabase = require("./dropDatabase");

let userTest = {
  email: "t@toto.com",
  password: "123456",
  firstname: "t",
  lastname: "t"
};

describe("Auth and user API", function() {
  before(async () => {
    await clearDatabase();
  });
  it("should return 0 user", () => {
    chai.request(index)
      .get("/users")
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.have.lengthOf(0);
      });
  });
  it("should register new user, login and update it", (done) => {
    chai.request(index)
      .post("/register")
      .send(userTest)
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        chai.expect(res.body).to.have.property("id");
        const connectedUser = res.body;
        connectedUser.password = userTest.password;
        chai.request(index)
          .post("/register")
          .send(userTest)
          .end((err, res) => {
            chai.expect(res).to.have.status(422);
            chai.expect(res.body).to.have.property("email");

            chai.request(index)
              .post("/login")
              .send({ email, password } = connectedUser)
              .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property("token");
                const token = res.body.token;

                connectedUser.firstname = "gael";
                connectedUser.lastname = "stervinou";
                chai.request(index)
                  .put(`/users/${connectedUser.id}`)
                  .auth(token, { type: "bearer" })
                  .send(connectedUser)
                  .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.have.property("firstname");
                    chai.expect(res.body).to.have.property("lastname");

                    chai.request(index)
                      .delete(`/users/${connectedUser.id}`)
                      .auth(token, { type: "bearer" })
                      .end((err, res) => {
                        chai.expect(res).to.have.status(204);

                        done();
                      });
                  });
              });
          });
      });
  });


});