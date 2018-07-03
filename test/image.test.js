const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app')
const fs = require('fs');
chai.use(chaiHttp);

const email = 'test@mail.com';
const password = 'hacktiv8';
var token = '';
let imgFile = 'home-icon.png'

describe('upload image', () => {
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
        token = res.body.data.signIn.token
        done();
      });
  });

  it('should upload image',(done)=>{
    chai.request(app)
      .post('/upload')
      .attach('image', fs.readFileSync(__dirname +'/image/home-icon.png'), 'home-icon.png') 
      .end((err, res)=>{
        // console.log(__dirname+'/home-icon.png')
        // console.log(res)
        // console.log(err)
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('Your file is successfully uploaded')
        done()
      })
  })
  
});