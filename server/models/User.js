const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Password is optional for Google OAuth users
  googleId: { type: String, unique: true, sparse: true }, // Unique Google ID for OAuth users
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  address: { type: String },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

// Pre-save hook to hash password if it's modified or new
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next(); // Only hash password if it exists
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare the input password with the stored hash
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false; // No password to compare if using Google OAuth
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
