const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const session = require('express-session');
const dotenv = require('dotenv');
const User = require('./models/User');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config({ path: '.env' });

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`,
      });
    }
    return done(null, user);
  } catch (err) {
    console.error('Error in Google strategy:', err);
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('User authenticated:', req.user);
    // Generate a JWT token
    const token = jwt.sign(
      {
        id: req.user.id,
        name: req.user.name,
        role: req.user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set the JWT token as a cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Redirect to the client application
    res.redirect(process.env.CLIENT_URL || 'http://localhost:5173');
  });

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid', { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' }); // Clear session cookie
    res.clearCookie('token', { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' }); // Clear JWT token cookie

    //  res.redirect('http://localhost:5173'); // Redirect to frontend
  });
});

app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Error Handling
app.use((err, req, res, next) => {
  console.error('Error during OAuth flow:', err);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
