import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
// import products from "../data/products.js"; // temporary usage

// NOTE:
// @desc            create new order
// @route           POST /api/orders
// @access          Private
// asyncHandler:    allows us to avoid using try/catch block for async functions (async functions returns a promise).
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((orderItem) => ({
        ...orderItem,
        product: orderItem._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// NOTE:
// @desc            get logged in user orders
// @route           GET /api/orders/myorders
// @access          Private
// asyncHandler:    allows us to avoid using try/catch block for async functions (async functions returns a promise).
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// NOTE:
// @desc            get order by ID
// @route           GET /api/orders/:id
// @access          Private
// asyncHandler:    allows us to avoid using try/catch block for async functions (async functions returns a promise).
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// NOTE:
// @desc            update order to paid
// @route           POST /api/orders/:id/pay
// @access          Private
// asyncHandler:    allows us to avoid using try/catch block for async functions (async functions returns a promise).
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

// NOTE:
// @desc            update order to delivered
// @route           POST /api/orders/:id/deliver
// @access          Private/Admin
// asyncHandler:    allows us to avoid using try/catch block for async functions (async functions returns a promise).
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

// NOTE:
// @desc            Get all orders
// @route           POST /api/orders
// @access          Private/Admin
// asyncHandler:    allows us to avoid using try/catch block for async functions (async functions returns a promise).
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
