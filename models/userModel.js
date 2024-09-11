const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true,'Username is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
    trim: true,
    validate:{
      validator:async function (email) {
        const User = mongoose.model('User');
      const user = await User.findOne({email});
      return !user || this._id.equals(user._id);
    },
      message:'Email already exists.'
  }
  },
  password: {
    type: String,
    required: [true,'Password is required'],
    select: false,
  },
  active: {
    type: Boolean,
    select: false,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User',userSchema)

module.exports = User;
