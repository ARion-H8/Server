const User = require('../models/user.model')
const Product = require('../models/product.model')
const Transaction = require('../models/transaction.model')
const Cart = require('../models/cart.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var resolvers = {
  Query: {
    user: async (_, args, { user }) => {
      if (!user) {
        throw new Error("please login first")
      }
      let isUser = await User.findById(user._id)
        .populate({
          path: 'cart',
          populate: {
            path: 'product'
          }
        })
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
    signUp: async (_, { newUser }) => {
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
    addProduct: async (_, { newProduct }, { user }) => {
      if (!user) throw new Error("please login first")
      let product = await Product.create(newProduct)
      return product
    },
    editProduct: async (_, { productId, name, price, image }, { user }) => {
      if (!user) throw new Error("please login first")
      let editProduct = await Product.findByIdAndUpdate(productId, {
        name,
        price,
        image
      })
      return {
        name,
        price,
        image
      }
    },
    deleteProduct: async (_, { productId }, { user }) => {
      if (!user) throw new Error("please login first")
      let product = await Product.findByIdAndRemove(productId)
      return product
    },
    addCart: async (_, { newCartItem }, { user }) => {
      if (!user) throw new Error("please login first")
      let cartItem = await Cart.create({ ...newCartItem, user: user._id })
      await User.findByIdAndUpdate(user._id, {
        $push: {
          cart: cartItem._id
        }
      })

      return cartItem
    },
    editCart: async (_, { cartId, quantity }, { user }) => {
      if (!user) throw new Error("please login first")
      let edittedCart = await Cart.findByIdAndUpdate(cartId, {
        quantity
      })
      return edittedCart
    },
    deleteCart: async (_, { cartId }, { user }) => {
      if (!user) throw new Error("please login first")
      let cart = await Cart.findByIdAndRemove(cartId)
      await User.findByIdAndUpdate(user._id, {
        $pop: {
          cart: cart._id
        }
      })
      return cart
    },
  }
}

module.exports = resolvers