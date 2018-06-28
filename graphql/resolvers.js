const User = require('../models/user.model')
const Product = require('../models/product.model')
const Transaction = require('../models/transaction.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var resolvers = {
  Query: {
    user: async (_, args, { user }) => {
      if (!user) {
        throw new Error("please login first")
      }
      let isUser = await User.findById(user._id)
      return isUser
    },
    products: async (_, args, { user }) => {
      if (!user) throw new Error("please login first")
      let products = await Product.find()
      return products
    },
    transactions: async (_, args, { user }) => {
      if (!user) throw new Error("please login first")
      let transactions = await Transaction.find({
        userId: user._id
      })
      return transactions
    }
  },
  Mutation: {
    signUp: async(_, { newUser }) => {
      try {
        const user = await User.create(newUser)
        return user
      } catch (err) {
        console.log(err)
      }
    },
    signIn: async (_, { email, password }) => {
      let user = await User.findOne({ email })
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
    },
  }
}

module.exports = resolvers