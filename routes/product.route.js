const express = require("express");
const ProductModel = require("../model/product.model");
const productRouter = express.Router();
// use
productRouter.get("/product", async (req, res) => {
  const data = await ProductModel.find();
  return res.status(200).json({
    data,
  });
});

productRouter.get("/product/:id", (req, res) => {
  const id = req.params.id;
  return res.status(200).json({
    product_detail: `This is product detail with id: ${id}`,
  });
});

/**
 * userRole
 * name
 * attribute
 */
productRouter.post(
  "/product",
  (req, res, next) => {
    if (req.body.userRole == "admin") {
      next();
    } else {
      return res.status(403).json("ko co quyen");
    }
  },
  async (req, res) => {
    // B1: Lấy dữ liệu ra
    const data = req.body;
    const name = data.name;
    const attribute = data.attribute;

    /** B2: tạo mới product */
    const newProduct = await ProductModel.create({
      name: req.body.name,
      attribute: req.body.attribute,
    });

    // B3: trả dữ liệu mới về cho client
    return res.status(201).json({
      newProduct,
    });
  }
);
// entity dessrition <=> table, no quan he voi table
/**
 * RESTful API
 *
 * GET ALL PRODUCTs
 * => GET '/product'
 *
 * GET DETAIL PRODUCTS
 * => GET '/product/:id'
 *
 * create new product
 * => POST '/product'
 * header => cấu hình cơ bản của 1 request: post, từ client nào, domain,...
 * body   => data
 * letter => tem, ng gửi, ng nhận => header
 *
 * update a product
 * => PUT '/product/:id'
 *
 * delete a product
 * => DELETE '/product/:id'
 */

module.exports = productRouter;

/**
 * middleware
 * request => middleware => server => db => response
 *
 */
