const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const index = require("../index");
const clearDatabase = require("./dropDatabase");
const generalFixtures = require("./fixtures");

let userTest = {
  email: "test@toto.com",
  password: "test123456",
  passwordConfirmation: "test123456",
  firstname: "t",
  lastname: "t"
};

describe("As a user, I", function() {
  before(async() => {
    await clearDatabase();
    await generalFixtures();
  });
  
  it("should register a new user", (done) => {
    chai.request(index)
      .post("/register")
      .send(userTest)
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        chai.expect(res.body).to.have.property("email");
        done();
      });
  });

  it("shouldn't be able to register a user with duplicate email", (done) => {
    chai.request(index)
      .post("/register")
      .send(userTest)
      .end((err, res) => {
        chai.expect(res).to.have.status(422);
        chai.expect(res.body).to.have.property("email");
        done();
      });
  });

  it("should be able to log in", (done) => {
    chai.request(index)
      .post("/login")
      .send({ email, password } = userTest)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.have.property("token");
        done();
      });
  });

  // TODO fix feature before unabling again this test
  xit("should update user information", (done) => { 
    chai.request(index)
    .post("/login")
    .send({ email, password } = userTest)
    .end((err, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property("token");

      let connectedUser = res.body;
      const token = connectedUser.token;

      chai.request(index)
        .get(`/users/me`)
        .auth(token, { type: "bearer" })
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.have.property("id");

          connectedUser = res.body;
          connectedUser.firstname = "gael";
          connectedUser.lastname = "stervinou";
          chai.request(index)
            .patch(`/users/${connectedUser.id}`)
            .auth(token, { type: "bearer" })
            .send(connectedUser)
            .end((err, res) => {
              chai.expect(res).to.have.status(200);
              chai.expect(res.body).to.have.property("firstname");
              chai.expect(res.body).to.have.property("lastname");
              done();
            });
        });

    });
  });

  // TODO fix feature before unabling again this test
  xit("should delete user", (done) => {
    chai.request(index)
    .post("/login")
    .send({ email, password } = userTest)
    .end((err, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property("token");

      const connectedUser = res.body;
      const token = res.body.token;

      chai.request(index)
      .get(`/users/me`)
      .auth(token, { type: "bearer" })
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.have.property("id");

        connectedUser.id = res.body.id;
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