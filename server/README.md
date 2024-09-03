# URBANStore Backend

## Description
This is the backend server for URBANStore, an e-commerce platform for urban fashion. It provides RESTful API endpoints for user authentication, product management, order processing, and more.

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- Passport.js for Google OAuth

## Prerequisites
- Node.js (v14 or later)
- MongoDB

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/ahsanch008/urbanstore-backend.git
   cd urbanstore-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SESSION_SECRET=your_session_secret
   ```

## Running the Server
To start the server in development mode:
```
npm run dev
```

For production:
```
npm start
```

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
- `GET /users/wishlist`: Get user