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

// NOTE:
// @desc            create products
// @route           POST /api/products
// @access          Public/Admin
// asyncHandler:    allows us to avoid using try/catch block for async functions (async functions returns a promise).
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// NOTE:
// @desc            Update product
// @route           POST /api/products/:id
// @access          Public/Admin
// asyncHandler:    allows us to avoid using try/catch block for async functions (async functions returns a promise).
const updateProduct = asyncHandler(async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  // console.log(req);

  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.status(201).json({ message: "Product updated", updatedProduct });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// NOTE:
// @desc            delete product
// @route           GET /api/products/:id
// @access          Admin/Private
// asyncHandler:    allows us to avoid using try/catch block for async functions (async functions returns a promise).
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Producted deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
