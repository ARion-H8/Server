const chai     = require('chai');
const chaiHttp = require('chai-http');
const expect   = chai.expect;
const app      = require('../app');
chai.use(chaiHttp);
const userModel = require('../models/user.model')

const email = 'test@mail.com';
const password = 'hacktiv8';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjNhMzczZGRhNDFlMzJiYTExMjY4NjYiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE1MzA1NDE5NTl9.uwWehqRa9OKFxekqzZx1aQKgaWr0A5LSMYajV9ERayw';
const newUser= {
  username: "test",
  email: "test@mail.com",
  password: "hacktiv8"
}

describe('user resolvers', () => {
  it('should succes to login and get token', (done) => {
    chai.request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            signIn(email: "${email}", password: "${password}"){
              _id
              email
              password
              email
              token
            }
          }
        `
      })
      .end((err, res) => {
        if(err){
          throw err;
        };
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('should failed to login', (done) => {
    chai.request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            signIn(email: "${email}", password: "${password}1"){
              _id
              email
              password
              email
              token
            }
          }
        `
      })
      .end((err, res) => {
        if(err){
          throw err;
        };
        expect(res.status).to.be.equal(200);
        // expect(res.body.data).to.be.an('undefined');
        done();
      });
  });

  it('register user ', (done) => {
    chai.request(app)
      .post('/graphql')
      .send({
        query:`
        mutation {
          signUp(newUser: {
            username: "${newUser.username}",
            email: "${newUser.email}",
            password: "${newUser.password}"
          }){
            username
            password
            email
          }
        }
        `
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('should failed register user ', (done) => {
    chai.request(app)
      .post('/graphql')
      .send({
        query:`
        mutation {
          signUp(newUser: {
            username: "${newUser.username}",
            email: "${newUser.email}",
            password: "${newUser.password}"
          }){
            username
            password
            email
          }
        }
        `
      })
      .end((err, res) => {
        if(err) {
          throw err.message;
        };
        expect(res.status).to.be.equal(200);
        expect(res.body.data.signUp).to.be.equal(null);
        done();
      });
  });

  it('show user', (done) => {
    chai.request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${ token }` )
      .send({
        query:`
        query {
          user {
            _id
            username
            email
            password
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

  it('failed get user', (done) => {
    chai.request(app)
      .post('/graphql')
      .send({
        query:`
        query {
          user {
            _id
            username
            email
            password
          }
        }
        `
      })
      .end(async (err, res) => {
        expect(res.body.data.user).to.be.equal(null);
        // await userModel.findOneAndRemove({
        //   email:email
        // })
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