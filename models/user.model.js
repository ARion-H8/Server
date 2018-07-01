const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const usersSchema = new Schema ({
  username: {
    type: String,
    require: [true, 'Please input your username']
  },
  email: {
    type: String,
    required: [ true, 'You Should Input Your Email' ],
    unique: [ true, 'Email Already Registered' ],
    validate:{
        isAsync: true,
        validator:(email, callback)=>{
            let emailValidate = /^[a-zA-Z0-9._-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
            callback(emailValidate.test(email),'Email Doesn\'t Meet Criteria' )
        }
    }
  },
  password: {
    type: String,
    require: [true, 'Please input your password']
  },
  cart: [{
    type: Schema.Types.ObjectId, ref: 'Cart',
  }],
}, {
  timestamps: true
})

usersSchema.pre('save', function(next) {
  let salt = bcrypt.genSaltSync()
  let numeric = this.password.match(/\d+/g)

  if (this.password.length < 6 || !numeric) {
    let err = { message: 'your password must contain at least 6 digit and numeric' }
    next(err)
  }

  bcrypt.hash(this.password, salt, (err, hashed) => {
    if (err) {
      console.log(err)
    } else {
      this.password = hashed
      next()
    }
  })
})

const user = mongoose.model('user', usersSchema)

module.exports = user