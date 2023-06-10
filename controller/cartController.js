const mongoose = require("mongoose");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.createCartItem = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const cartItem = req.body;
  // Retrieve existing cart items for the user
  const { cartItems } = await User.findById(userId).select("cartItems");
  // Add cartItem with the retrieved cart items
  cartItems.push(cartItem);
  // Update cart items for the user
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { cartItems },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

exports.getCartItems = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  // Retrieve existing cart items for the user
  const { cartItems } = await User.findById(userId).select("cartItems");

  res.status(200).json({
    status: "success",
    results: cartItems.length,
    data: {
      cartItems,
    },
  });
});

exports.updateCartItems = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  // Get cart items for particular user
  const { cartItems } = await User.findById(userId).select("cartItems");
  // On cart item update, request body will contain only cartItem
  const { cartItemId = req.body.cartItem._id, cartItem } = req.body;
  // Delete cart item from retrieved cart items
  let updatedCartItems = cartItems.filter(
    (cartItem) => cartItem._id.toString() !== cartItemId
  );

  // On cart item update
  if (cartItem) {
    updatedCartItems.push(cartItem);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { cartItems: updatedCartItems },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
