var express = require("express");
const OrderModel = require("../model/order.model");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", async (req, res, next) => {
  try {
    const { productId, userId, quantity } = req.body;
    const newOrder = await OrderModel.create({
      productId,
      userId,
      quantity,
    });
    return res.status(201).json({
      data: newOrder,
      message: "Create new Order",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const order = await OrderModel.findById(orderId)
      .populate("userId", {
        fullname: 0,
        __v: 0,
        _id: 0,
      })
      .populate("productId");

    const total = order.quantity * order.productId.price;
    const data = { ...order._doc, total: total };

    return res.status(200).json({
      data: data,
      message: "get detail order",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
