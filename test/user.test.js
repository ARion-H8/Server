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
  email: "testa@mail.com",
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
        done();
      });
  });

  it('check connected to express', (done) => {
    chai.request(app)
        .get('/')
        .end((err,res)=>{
          expect(res.status).to.be.equal(200)
          done()
        })
  })
  it('check failed connect to express', (done) => {
    chai.request(app)
        .get('/index')
        .end((err,res)=>{
          expect(res.status).to.be.equal(404)
          done()
        })
  })
  it('check connected to users route', (done) => {
    chai.request(app)
        .get('/users')
        .end((err,res)=>{
          expect(res.status).to.be.equal(200)
          done()
        })
  })
});