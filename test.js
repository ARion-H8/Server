const chai = require('chai')
const expect = chai.expect;
const chaiGraphQL = require('chai-graphql')
const app = require('./app')
chai.use(chaiGraphQL)

const graphql = require('graphql');

var goodResponse = {
  data: {
    foo: 'bar'
  }
}

// Passes
assert.graphQL(goodResponse, { foo: 'bar' })

// export default new graphql.GraphQLObjectType({
// name : 'User',
//  fields : {
//      _id : {
//          type : graphql.GraphQLString
//      },
//      username:{
//          type: graphql.GraphQLString
//      },
//      email : {
//          type : graphql.GraphQLString
//      },
//      name : {
//       type : graphql.GraphQLString
//     },
//   }
// });