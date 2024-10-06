const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  age: {
    type: Number,
    default: 18,
  },
  password: String
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
