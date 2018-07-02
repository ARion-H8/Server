const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
chai.use(chaiHttp);

const email = 'test@mail.com';
const password = 'hacktiv8';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjNhMzczZGRhNDFlMzJiYTExMjY4NjYiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE1MzA1NDE5NTl9.uwWehqRa9OKFxekqzZx1aQKgaWr0A5LSMYajV9ERayw';
const product = {
  name: "Pith Helmet",
  obj_name: "hat",
  price: 100000,
  image: "https://storage.googleapis.com/storagetestupload/1530519614228hat.png",
  obj_url: "https://storage.googleapis.com/storagetestupload/1530519500150pith_helmet.obj",
  texture_url: "https://storage.googleapis.com/storagetestupload/1530519478247pith_helmet_spec.jpg"
}

var productId = ''

describe('product resolvers', () => {
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

  it('show products', (done) => {
    chai.request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
        query {
          products {
            _id
            name
            price
            image
            obj_url
            obj_name
            texture_url
          }
        }
        `
      })
      .end((err, res) => {
        if (err) {
          throw err;
        };
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('failed add product', (done) => {
    chai.request(app)
      .post('/graphql')
      .send({
        query: `
        mutation {
          addProduct(newProduct: {
            price: ${product.price}
            image: ${product.image}
            obj_name: ${product.obj_name}
            obj_url: ${product.obj_url}
            texture_url: ${product.texture_url}
          }) {
            _id
          }
        }
        `
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body.errors).to.be.an('array');
        done();
      });
  })

  it('success add product', (done) => {
    chai.request(app)
      .post('/graphql')
      .send({
        query: `
        mutation {
          addProduct(newProduct: {
            name: "${product.name}",
            price: ${product.price},
            image: "${product.image}",
            obj_name: "${product.obj_name}",
            obj_url: "${product.obj_url}",
            texture_url: "${product.texture_url}"
          }) {
            _id
          }
        }
        `
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  })

  it('show products', (done) => {
    chai.request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
        query {
          products {
            _id
            name
            price
            image
            obj_url
            obj_name
            texture_url
          }
        }
        `
      })
      .end((err, res) => {
        if (err) {
          throw err;
        };
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});