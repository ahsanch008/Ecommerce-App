# URBANStore E-Commerce Platform

## Description
URBANStore is a full-stack e-commerce platform for urban fashion. It provides a seamless shopping experience with features like user authentication, product browsing, cart management, order processing, and an admin dashboard for managing products, orders, and users.
## Features and Functionality

### User Authentication and Authorization
- User registration with email and password
- User login with email and password
- Google OAuth integration for quick sign-up and login
- JWT-based authentication for secure API requests
- Role-based access control (user and admin roles)

### Product Management
- Browse products with pagination and sorting options
- Search products by name or description
- View detailed product information, including images, price, and description
- Filter products by category
- Admin functionality to add, edit, and delete products
- Manage product inventory and stock levels

### Shopping Cart
- Add products to cart
- Adjust quantity of items in cart
- Remove items from cart
- Persistent cart across sessions
- Real-time cart total calculation

### Wishlist
- Add products to personal wishlist
- Remove products from wishlist
- View all wishlist items

### Checkout Process
- Secure checkout flow
- Address input for shipping
- Integration with Stripe for payment processing
- Order summary before final purchase

### Order Management
- Place new orders
- View order history for users
- Detailed view of individual orders
- Admin functionality to update order status (e.g., processing, shipped, delivered)
- Order cancellation (for pending orders)

### User Profile
- View and edit user profile information
- Change password functionality
- View order history and status

### Review System
- Users can write reviews for products
- Star rating system for products
- View all reviews for a product
- Admin moderation of reviews (approve/reject)

### Admin Dashboard
- Overview of key metrics (total products, users, orders, pending reviews)
- Quick access to product, user, order, and review management
- Analytics and reporting features (e.g., sales data, popular products)

### Responsive Design
- Mobile-friendly interface
- Consistent user experience across devices (desktop, tablet, mobile)

### Performance and UX
- Fast loading times with optimized assets
- Smooth transitions and animations
- Intuitive navigation with a clear information hierarchy

### Security Features
- Secure password hashing with bcrypt
- Protection against common web vulnerabilities (e.g., XSS, CSRF)
- CORS configuration to restrict API access

### Additional Features
- Newsletter subscription option
- Social media integration (sharing products, following store accounts)
- Related products suggestions
- New arrivals and featured products sections
- Discount and promotion system (backend support, frontend display)

### Scalability and Maintenance
- Modular code structure for easy maintenance and feature additions
- Environment-based configuration for development and production setups
- Error logging and monitoring capabilities


## Project Structure
The project is divided into two main parts:
- `client/`: Frontend application built with React and Vite
- `server/`: Backend API built with Node.js and Express

## Technologies Used

### Frontend
- React.js
- Vite (for build tooling)
- React Router (for navigation)
- Axios (for API requests)
- Tailwind CSS (for styling)
- React Icons
- @heroicons/react
- @react-oauth/google (for Google OAuth integration)
- @stripe/react-stripe-js and @stripe/stripe-js (for payment processing)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- Passport.js for Google OAuth

## Prerequisites
- Node.js (v14 or later)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahsanch008/urbanstore.git
   cd urbanstore
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:
   - For the frontend, create a `.env` file in the `client/` directory:
     ```
     VITE_API_URL=http://localhost:3000
     VITE_GOOGLE_CLIENT_ID=your_google_client_id
     ```
   - For the backend, create a `.env` file in the `server/` directory:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     SESSION_SECRET=your_session_secret
     ```

## Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to view the application.


## API Endpoints

### Authentication
- `POST /auth/signup`: Register a new user
- `POST /auth/login`: Login user
- `GET /auth/google`: Initiate Google OAuth login
- `GET /auth/google/callback`: Google OAuth callback
- `GET /auth/logout`: Logout user

### Users
- `GET /users/profile`: Get user profile
- `PUT /users/:id`: Update user profile
- `PUT /users/change-password`: Change user password
- `POST /users/wishlist`: Add product to wishlist
- `DELETE /users/wishlist/:productId`: Remove product from wishlist
- `GET /users/wishlist`: Get user's wishlist

### Products
- `POST /products`: Create a new product
- `GET /products`: Get all products
- `GET /products/:id`: Get a specific product
- `PUT /products/:id`: Update a product
- `DELETE /products/:id`: Delete a product

### Orders
- `POST /orders`: Create a new order
- `GET /orders`: Get all orders for a user
- `GET /orders/:id`: Get a specific order
- `PUT /orders/:id/status`: Update order status

### Reviews
- `POST /reviews`: Create a new review
- `GET /reviews/product/:productId`: Get reviews for a product
- `PUT /reviews/:id`: Update a review
- `DELETE /reviews/:id`: Delete a review


