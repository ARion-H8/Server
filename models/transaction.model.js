const mongoose = require('mongoose')
const schema = mongoose.Schema

const transactionSchema = new schema({
  userId: {
    type: schema.Types.ObjectId, ref: 'User',
  },
  productId: {
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

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction