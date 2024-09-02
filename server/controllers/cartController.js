const Cart = require('../models/Cart');
const Product = require('../models/Product');


exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] }); // Ensure user ID is set
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error); // Add logging
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    console.log("Cart:", cart);
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart.total = cart.items.reduce((total, item) => {
      return total + (item.quantity * product.price);
    }, 0);

    await cart.save();
    await cart.populate('items.product'); // Updated line
    res.json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error); // Add logging
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    cart.items[itemIndex].quantity = quantity;
    cart.total = cart.items.reduce((total, item) => {
      return total + (item.quantity * product.price);
    }, 0);

    await cart.save();
    await cart.populate('items.product'); // Updated line
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    cart.total = await recalculateCartTotal(cart);

    await cart.save();
    await cart.populate('items.product'); // Updated line
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};

async function recalculateCartTotal(cart) {
  let total = 0;
  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    if (product) {
      total += item.quantity * product.price;
    }
  }
  return total;
}
