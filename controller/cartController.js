const Cart = require("./../models/cartModel");

exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json({
      status: "success",
      results: cartItems.length,
      data: {
        cartItems,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.createCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        cartItem,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        cartItem,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};
