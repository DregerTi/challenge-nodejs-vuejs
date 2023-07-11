const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const index = require('../index');

describe('Health', () => {
  it('should return 200', (done) => {
    chai.request(index)
      .get('/')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});