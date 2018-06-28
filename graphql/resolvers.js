const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    user: async (_, args, { user }) => {
      let isUser = await User.findById(user._id)
      return isUser
    }
  },
  Mutation: {
    signUp: async(_, { newUser }) => {
      // console.log('input user', newUser)
      try {
        const user = await User.create(newUser)
        // console.log("user data ===> ", user )
        return user
      } catch (err) {
        console.log(err)
      }
    },
    signIn: async(_, { email, password }) => {
      let salt = bcrypt.genSaltSync()
      let user = await User.findOne({email})
      let token;
      let isUser = bcrypt.compareSync(password, user.password)
      if (isUser) {
        let key = process.env.SECRET
        token = jwt.sign({
          _id: user._id,
          name: user.name,
          email
        }, key)
        return {
          message: 'Sign In Success',
          _id: user.id,
          email,
          password,
          token
        }
      } else {
        return 'Sign In Failed'
      }
    }
  }
}

module.exports = resolvers