const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "provide name"]
  },
  email: {
    type: String,
    required: [true, "provide email"],
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile_pic: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
})

const User = mongoose.model("user", UserSchema);

module.exports = User