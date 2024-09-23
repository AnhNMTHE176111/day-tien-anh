const { default: mongoose } = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  attribute: String,
  price: {
    type: Number,
    default: 200,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
