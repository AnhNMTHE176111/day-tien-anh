const express = require("express");
const ProductModel = require("../model/product.model");
const productRouter = express.Router();
// use
// productRouter.get("/product", async (req, res) => {
//   const data = await ProductModel.find();
//   return res.status(200).json({
//     data,
//   });
// });

// productRouter.get("/product/:id", (req, res) => {
//   const id = req.params.id;
//   return res.status(200).json({
//     product_detail: `This is product detail with id: ${id}`,
//   });
// });

/**
 * userRole
 * name
 * attribute
 * key = value
 * tài liệu rds,...
 */
productRouter.post("/product", async (req, res, next) => {
  try {
    const { nameProduct, attributeProduct, pricePrd } = req.body;

    const newProduct = await ProductModel.create({
      name: nameProduct,
      attribute: attributeProduct,
      price: pricePrd,
    });

    return res.status(201).json({
      data: newProduct,
      message: "Create new product",
    });
  } catch (error) {
    console.log("log from product create", error);
    next(error);
  }
});

productRouter.get("/product/:id", async (req, res, next) => {
  try {
    // 0, 1
    const productId = req.params.id;
    const product = await ProductModel.find(
      { _id: productId },
      {
        // name: 1,
        _id: 0,
        __v: 0,
        attribute: 0,
        // price: 1,
      }
    );

    return res.status(200).json({
      data: product
    });
  } catch (error) {
    next(error);
  }
});

productRouter.get("/product/", async (req, res, next) => {
  try {
    const product = await ProductModel.find();
    const data = [];

    product.forEach((item) => {
      data.push({
        product_name: item.name,
        price_product: `${item.price / 100}%`,
      });
    });

    return res.status(200).json({
      data: data,
      message: "Get product success",
    });
  } catch (error) {
    next(error);
  }
});

productRouter.put("/product/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { name, attribute, price } = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        name,
        attribute,
        price,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      data: updatedProduct,
      message: "Update product success",
    });
  } catch (error) {
    next(error);
  }
});

// C => R => U => D

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
