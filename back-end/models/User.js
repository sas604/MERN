const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: 'you need supply the name',
      unique: true,
      trim: true,
    },
    qBookCredentials: {
      accesToken: String,
      refreshToken: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
