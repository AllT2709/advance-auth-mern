const crypto = require("crypto");
const mongoose = require("mongoose");

const { encryptPassword, comparePassword } = require("../helper/configPass");
const { signToken } = require("../helper/handlerToken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please provide a username"],
  },
  email: {
    type: String,
    require: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  console.log("is modified1: ", this.isModified("password"));
  if (!this.isModified("password")) {
    console.log("is modified2: ", this.isModified("password"));
    next();
  }
  this.password = await encryptPassword(this.password);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  const isMatch = await comparePassword(password, this.password);
  return isMatch;
};

UserSchema.methods.getSignedToken = function () {
  return signToken({ id: this._id });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
