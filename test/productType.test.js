const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;

const chaiGraphQL = require("chai-graphql");
chai.use(chaiGraphQL);

var badResponse = {
  "data": {
		"user": null
	},
	"errors": [
		{
			"message": "please login first",
			"locations": [
				{
					"line": 2,
					"column": 2
				}
			],
			"path": [
				"user"
			]
		}
	]
}

describe('output', () => {
  // Tests
  it('Should have get error', () => {
    assert.graphQLError(badResponse)
  });
});


// assert.graphQL(goodResponse, { user: 'user' })

