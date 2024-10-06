const { default: mongoose } = require("mongoose");

const OrderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
