const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const index = require('../index');

const connectedUser = {
    email: 't@toto.com',
    password: '123456',
    firstname: 't',
    lastname: 't'
}
describe('Register', function () {

    // Optionally we could insert fake data before each test, but in this case it's not needed
    // beforeEach('Insert fake data', async function () {
    //   await client.query('INSERT INTO pg_temp.note (name, content) VALUES ("a_note", "some_content")')
    // })

    it('should return 201', (done) => {
        chai.request(index)
            .post('/register')
            .send(connectedUser)
            .end((err, res) => {
                console.log(err);
                chai.expect(res).to.have.status(201);
                done();
            });
    });
});