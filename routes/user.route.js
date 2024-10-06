var express = require("express");
const UserModel = require("../model/user.model");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", async (req, res, next) => {
  try {
    const { fullname, gender, age } = req.body;
    const newUser = await UserModel.create({
      fullname,
      gender,
      age,
    });
    return res.status(201).json({
      data: newUser,
      message: "Create new User",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
