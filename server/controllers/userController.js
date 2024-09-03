const User = require('../models/User');
const Product = require('../models/Product');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, address },
      { new: true, runValidators: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user profile', error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    user.wishlist.push(productId);
    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.createUser = async (req, res) => {
  const newUser = req.body;
  try {
   
    const user = await User.create(newUser);

    console.log("User created ");
    res.redirect("localhost:5173");
  } catch (error) {
    console.error("Cannot create user! ", error);
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    

    const payload = {
      id: user._id,
      name: user.name,
      role: 'user'
    };
    const token = jwt.sign(payload, "your_jwt_secret_key", {
      expiresIn: "1h",
    });
      // Set the JWT token as a cookie
    res.cookie('token', token, { httpOnly: true, secure: false }); // Set secure to true if using HTTPS


    res.status(200).json({
      status: "success",
      data: {
        user: payload,
        token
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



exports.logoutUser = (req, res, next) => {
  res.clearCookie('connect.sid', { path: '/' });
  res.clearCookie('token', { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });

  res.status(200).json({ message: "Logged out successfully" });
};

