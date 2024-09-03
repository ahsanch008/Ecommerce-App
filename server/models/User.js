const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true }, 
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  address: { type: String },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });


userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next(); 
  this.password = await bcrypt.hash(this.password, 10);
  next();
});



module.exports = mongoose.model('User', userSchema);
