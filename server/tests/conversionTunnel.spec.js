const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const index = require("../index");
const clearDatabase = require("./dropDatabase");


describe("Conversion tunnel API", function() {
  after(async () => {
    await clearDatabase();
  });


  it("should return 200", (done) => {
    chai.request(index)
      .post("/login")
      .send({ email: "t@toto.com", password: "test123456" })
      .end((err, res) => {
        console.log(res.body);
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.have.property("token");
        const adminToken = res.body.token;
        chai.request(index)
          .get("/sites/my-sites")
          .auth(adminToken, { type: "bearer" })
          .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.have.lengthOf(1);
            const site = res.body[0];

            chai.request(index)
              .post(`/sites/${site.id}/conversion-tunnels`)
              .auth(adminToken, { type: "bearer" })
              .send({
                name: "Achat"
              })
              .end((err, res) => {
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.have.property("name").to.equal("Achat");
                chai.expect(res.body).to.have.property("siteId").to.equal(site.id);

                done();
              });
          });
      });
  });
});