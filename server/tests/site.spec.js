const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const index = require("../index");
const clearDatabase = require("./dropDatabase");

let adminUser = {
  email: "t@toto.com",
  password: "test123456",
  firstname: "admin",
  lastname: "admin"
};
let userOne = {
  email: "user1@t.com",
  password: "test123456",
  firstname: "user1",
  lastname: "user1"
};
let userTwo = {
  email: "user2@t.com",
  password: "test123456",
  firstname: "user2",
  lastname: "user2"
};


describe("Site and SiteInvitation API", function() {
  before(async () => {
    await clearDatabase();
  });
  it("should register new user, login it, create a new site, " +
    "send invitation to 2 users, one accepts it and the other refuse, and finally list the site's users", (done) => {
    chai.request(index)
      .post("/register")
      .send(adminUser)
      .end((err, res) => {

        chai.expect(res).to.have.status(201);
        chai.request(index)
          .post("/register")
          .send(userOne)
          .end((err, res) => {
            chai.expect(res).to.have.status(201);
            chai.request(index)
              .post("/register")
              .send(userTwo)
              .end((err, res) => {
                chai.expect(res).to.have.status(201);

                chai.request(index)
                  .post("/login")
                  .send({ email: "t@toto.com", password: "test123456" })
                  .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.have.property("token");
                    let adminToken = res.body.token;

                    chai.request(index)
                      .post("/sites")
                      .auth(adminToken, { type: "bearer" })
                      .send({ name: "site test", url: "http://site.test" })
                      .end((err, res) => {
                        chai.expect(res).to.have.status(201);
                        chai.expect(res.body).to.have.property("id");
                        const site = res.body;


                        chai.request(index)
                          .post(`/invitations`)
                          .auth(adminToken, { type: "bearer" })
                          .send(
                            { email: userOne.email, siteId: site.id }
                          )
                          .end((err, res) => {
                            chai.expect(res).to.have.status(201);
                            chai.request(index)
                              .post(`/invitations`)
                              .auth(adminToken, { type: "bearer" })
                              .send(
                                { email: userTwo.email, siteId: site.id }
                              )
                              .end((err, res) => {
                                chai.expect(res).to.have.status(201);


                                chai.request(index)
                                  .post("/login")
                                  .send(userOne)
                                  .end((err, res) => {
                                    chai.expect(res).to.have.status(200);
                                    chai.expect(res.body).to.have.property("token");
                                    let userOneToken = res.body.token;


                                    chai.request(index)
                                      .get(`/invitations/my-invitations`)
                                      .auth(userOneToken, { type: "bearer" })
                                      .end((err, res) => {
                                        chai.expect(res).to.have.status(200);
                                        chai.expect(res.body).to.have.lengthOf(1);
                                        let invitationId = res.body[0].id;


                                        chai.request(index)
                                          .get(`/invitations/${invitationId}/accept`)
                                          .auth(userOneToken, { type: "bearer" })
                                          .end((err, res) => {
                                            chai.expect(res).to.have.status(200);
                                            chai.expect(res.body).to.have.property("id", invitationId);
                                            chai.expect(res.body).to.have.property("accepted", true);

                                            chai.request(index)
                                              .post("/login")
                                              .send(userTwo)
                                              .end((err, res) => {
                                                chai.expect(res).to.have.status(200);
                                                chai.expect(res.body).to.have.property("token");
                                                let userTwoToken = res.body.token;


                                                chai.request(index)
                                                  .get(`/invitations/my-invitations`)
                                                  .auth(userTwoToken, { type: "bearer" })
                                                  .end((err, res) => {
                                                    chai.expect(res).to.have.status(200);
                                                    chai.expect(res.body).to.have.lengthOf(1);
                                                    let invitationId = res.body[0].id;

                                                    chai.request(index)
                                                      .get(`/invitations/${invitationId}/refuse`)
                                                      .auth(userTwoToken, { type: "bearer" })
                                                      .end((err, res) => {
                                                        chai.expect(res).to.have.status(200);
                                                        chai.expect(res.body).to.have.property("id", invitationId);
                                                        chai.expect(res.body).to.have.property("accepted", false);

                                                        chai.request(index)
                                                          .get(`/invitations/${invitationId}/accept`)
                                                          .auth(userTwoToken, { type: "bearer" })
                                                          .end((err, res) => {
                                                            chai.expect(res).to.have.status(409);
                                                            chai.expect(res.body).to.have.property("error", "Invitation already accepted or refused");


                                                            chai.request(index)
                                                              .get(`/sites/${site.id}/users`)
                                                              .auth(adminToken, { type: "bearer" })
                                                              .end((err, res) => {
                                                                chai.expect(res).to.have.status(200);
                                                                chai.expect(res.body).to.have.lengthOf(2);
                                                                chai.expect(res.body[1]).to.have.property("email", userOne.email);

                                                                chai.request(index)
                                                                  .get(`/sites/${site.id}/users`)
                                                                  .auth(userTwoToken, { type: "bearer" })
                                                                  .end((err, res) => {
                                                                    chai.expect(res).to.have.status(403);

                                                                    done();
                                                                  });
                                                              });
                                                          });
                                                      });
                                                  });
                                              });
                                          });

                                      });


                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  });
});
