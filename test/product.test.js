const chai     = require('chai');
const chaiHttp = require('chai-http');
const expect   = chai.expect;
const app      = require('../app');
chai.use(chaiHttp);

const email = 'hacktiv8@gmail.com';
const password = 'hacktiv8';
var token = '';
const newUser= {
  username: "rey",
  email: "rey@gmail.com",
  password: "hacktiv8"
}

describe('product test', () => {

  it('register user', (done) => {
    chai.request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${ token }` )
      .send({
        query:`
        query {
          products{
            _id
            name
            price
            image
          }
        }
        `
      })
      .end((err, res) => {
        if(err) {
          throw err;
        };
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  


  // it('authentication user', (done) => {
  //   chai.request(app)
  //     .post('/graphql')
  //     .send({
  //       query:`
  //         query{
  //           user(token: "${token}"){
  //             full_name
  //             username
  //             email
  //           }
  //         }
  //       `
  //     })
  //     .end((err, res) => {
  //       if(err) {
  //         throw err;
  //       };
  //       expect(res.status).to.be.equal(200);
  //       expect(res.body.data).to.be.an('object');
  //       done();
  //     })
  // });

  // it('authentication user without token', (done) => {
  //   chai.request(app)
  //     .post('/graphql')
  //     .send({
  //       query:`
  //         query{
  //           user(token: " "){
  //             full_name
  //             username
  //             email
  //           }
  //         }
  //       `
  //     })
  //     .end((err, res) => {
  //       if(err) {
  //         throw err;
  //       };
  //       expect(res.body.data.user).to.be.null;
  //       done();
  //     })
  // });

  // it('login user', (done) => {
  //   chai.request(app)
  //     .post('/graphql')
  //     .send({
  //       query:`
  //         mutation login {
  //           login(email: "${email_test}", password: "${password_test}") {
  //             user {
  //               username
  //               full_name
  //             }
  //             token
  //           }
  //         }
  //       `
  //     })
  //     .end((err, res) => {
  //       if(err) {
  //         throw err;
  //       };
  //       expect(res.status).to.be.equal(200);
  //       expect(res.body.data).to.be.an('object');
  //       expect(res.body.data.login.token).to.be.a('string');
  //       done();
  //     })
  // });

  // it('login user with wrong email', (done) => {
  //   chai.request(app)
  //     .post('/graphql')
  //     .send({
  //       query:`
  //         mutation login {
  //           login(email: "lala@mail.com", password: "${password_test}") {
  //             user {
  //               username
  //               full_name
  //             }
  //             token
  //           }
  //         }
  //       `
  //     })
  //     .end((err, res) => {
  //       if(err) {
  //         throw err;
  //       };
  //       expect(res.body.data.login).to.be.null;
  //       done();
  //     })
  // });

  // it('login user with wrong password', (done) => {
  //   chai.request(app)
  //     .post('/graphql')
  //     .send({
  //       query:`
  //         mutation login {
  //           login(email: "${email_test}", password: "@lalalala1234Q") {
  //             user {
  //               username
  //               full_name
  //             }
  //             token
  //           }
  //         }
  //       `
  //     })
  //     .end((err, res) => {
  //       if(err) {
  //         throw err;
  //       };
  //       expect(res.body.data.login).to.be.null;
  //       done();
  //     })
  // });

  // it('update user', (done) => {
  //   chai.request(app)
  //     .post('/graphql')
  //     .send({
  //       query:`
  //         mutation{
  //           updateUser(token:"${token}" full_name: "asep", email:"asep@mail.com", username:"asep44"){
  //             full_name
  //             username
  //             email
  //           }
  //         }
  //       `
  //     })
  //     .end((err, res) => {
  //       if(err) {
  //         throw err;
  //       };
  //       expect(res.status).to.be.equal(200);
  //       expect(res.body.data).to.be.an('object');
  //       done();
  //     });
  // });

  // it('update user without token', (done) => {
  //   chai.request(app)
  //     .post('/graphql')
  //     .send({
  //       query:`
  //         mutation{
  //           updateUser( full_name: "asep", email:"asep@mail.com", username:"asep44"){
  //             full_name
  //             username
  //             email
  //           }
  //         }
  //       `
  //     })
  //     .end((err, res) => {
  //       if(err) {
  //         throw err;
  //       };
  //       expect(res.body.data.updateUser).to.be.null;
  //       done();
  //     });
  // });

  // it('delete user', (done) => {
  //   chai.request(app)
  //     .post('/graphql')
  //     .send({
  //       query:`
  //         mutation delete{
  //           deleteUser(email: "${email_test}"){
  //             _id
  //             full_name
  //             username
  //             email
  //           }
  //         }
  //       `
  //     })
  //     .end((err, res) => {
  //       if(err) {
  //         throw err;
  //       };
  //       expect(res.status).to.be.equal(200);
  //       expect(res.body.data).to.be.an('object');
  //       done();
  //     });
  // });
});