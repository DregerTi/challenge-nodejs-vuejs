const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const index = require("../index");
const UserService = require("../services/user");

let users = {
  adminUser: {
    email: "t@toto.com",
    password: "test123456",
    passwordConfirmation: "test123456",
    firstname: "admin",
    lastname: "admin"
  },
  userOne: {
    email: "user1@t.com",
    password: "test123456",
    passwordConfirmation: "test123456",
    firstname: "user1",
    lastname: "user1"
  },
  userTwo: {
    email: "user2@t.com",
    password: "test123456",
    passwordConfirmation: "test123456",
    firstname: "user2",
    lastname: "user2"
  },
  userThree: {
    email: "toto@toto.com",
    password: "123456",
    passwordConfirmation: "123456",
    firstname: "t",
    lastname: "t"
  }
}


module.exports = async function generalFixtures() {
  for (let user in users) {
    register(users[user]);
  }
  
  loginAddSite(users.adminUser);
}

function register(userTest) {
  let Service = new UserService();
  Service.create(userTest);
}

function loginAddSite(userTest) {
  chai.request(index)
    .post("/login")
    .send({ email, password } = userTest)
    .end((err, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property("token");

      const token = res.body.token;

      chai.request(index)
      .post("/sites")
      .auth(token, { type: "bearer" })
      .send({ name: "site test", url: "http://site.test" })
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        chai.expect(res.body).to.have.property("id");
      });
    });
}