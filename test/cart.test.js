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

var productId = '5b3af8c3cf733514d19cfd8b'
var cartId = '5b3b06aba1e1da6d3cb1d308'

describe('cart resolvers', () => {
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
        userId = res.body.data.signIn._id
        done();
      });
  });

  it("show user's cart", (done) => {
    chai
      .request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
          query {
            user{
              cart{
                _id
                product{
                  _id
                  name
                  price
                  image
                }
                quantity
              }
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
        // console.log(res.body.data.user.cart)
      })
  })

  
it('should be failed to add cart', (done) => {
    chai
      .request(app)
      .post('/graphql')
      .send({
        query: `
          mutation addCart(newCartItem: {
            product: {
              name: "${product.name}",
              price: ${product.price},
              image: "${product.image}",
              obj_name: "${product.obj_name}",
              obj_url: "${product.obj_url}",
              texture_url: "${product.texture_url}"
            }
          }) {
              quantity
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

  it('should be success to add cart', (done) => {
    chai
      .request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
          mutation {
            addCart(newCartItem: {
              product: "${productId}"
              quantity: 1
            }) {
              quantity
            }
          }
        `
      })
      .end((err, res) => {
        if (err) {
          throw err
        }
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  })

  it('should be success to edit cart', (done) => {
    chai
      .request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
          mutation {
            editCart(
              cartId: "${cartId}"
              quantity: 2
            ) {
              quantity
            }
          }
        `
      })
      .end((err, res) => {
        if (err) {
          throw err
        }
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  })

  it('should be success to delete cart', (done) => {
    chai
      .request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
          mutation {
            deleteCart(
              cartId: "${cartId}"
            ) {
              _id
            }
          }
        `
      })
      .end((err, res) => {
        if (err) {
          throw err
        }
        // console.log(res)
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  })
})