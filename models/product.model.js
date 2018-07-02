const mongoose = require('mongoose')
const schema = mongoose.Schema

const productSchema = new schema({
  name: { type: String, require: true, default: 'No Title' },
  price: { type: Number, default: 0 },
  image: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
  },
  transactions: [{
    type: schema.Types.ObjectId, ref: 'Transaction',
  }],
  obj_name: String,
  obj_url: String,
  texture_url: String
}, {
    timestamps: true
  })

const Product = mongoose.model('Product', productSchema)

module.exports = Product