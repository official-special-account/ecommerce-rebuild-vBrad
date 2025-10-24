import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
// import products from "../data/products.js"; // temporary usage

// NOTE:
// @desc            fetch all products
// @route           GET /api/products
// @access          Public
// asyncHandler:    allows us to avoid using try/catch block for async functions (async functions returns a promise).
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.json(products);
  }
});

// NOTE:
// @desc            fetch single product
// @route           GET /api/products/:id
// @access          Public
// asyncHandler:    allows us to avoid using try/catch block for async functions (async functions returns a promise).
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProducts, getProductById };
