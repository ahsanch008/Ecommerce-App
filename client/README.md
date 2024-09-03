# URBANStore Frontend

## Description
This is the frontend application for URBANStore, an e-commerce platform for urban fashion. It provides a user-friendly interface for browsing products, managing orders, and interacting with the URBANStore backend API.

## Technologies Used
- React.js
- Vite (for build tooling)
- React Router (for navigation)
- Axios (for API requests)
- Tailwind CSS (for styling)
- React Icons
- @heroicons/react
- @react-oauth/google (for Google OAuth integration)
- @stripe/react-stripe-js and @stripe/stripe-js (for payment processing)

## Prerequisites
- Node.js (v14 or later)
- npm or yarn

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ahsanch008/urbanstore-frontend.git
   cd urbanstore-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or if you're using yarn:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```bash
   VITE_API_URL=http://localhost:3000 # Your backend API URL
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

## Running the Application
To start the development server:
