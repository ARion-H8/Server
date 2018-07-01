const mongoose = require('mongoose')
const schema = mongoose.Schema

const cartSchema = new schema({
  user: {
    type: schema.Types.ObjectId, ref: 'user',
  },
  product: {
    type: schema.Types.ObjectId, ref: 'Product'
  },
  quantity: {
    type: Number, required: true
  }
},
  {
    timestamps: true
  }
)

const Transaction = mongoose.model('Cart', cartSchema)

module.exports = Transaction