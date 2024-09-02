const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/database');
const session = require('express-session');
const auth_router= require('./Auth')
const cookieparser= require('cookie-parser')

// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", auth_router);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/reviews', reviewRoutes);

// Root route
app.get("*", (req, res) => {
  res.status(404).json({ msg: "The requested url was not found" });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
