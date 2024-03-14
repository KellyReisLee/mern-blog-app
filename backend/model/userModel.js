const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  posts: { type: Number, default: 0 },
  verified: { type: Boolean, default: false }


})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel