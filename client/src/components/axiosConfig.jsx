import axios from 'axios';

const isDevelopment = window.location.hostname === 'localhost';
const baseURL = isDevelopment 
  ? 'http://localhost:3000'
  : 'https://demo-ecomm-server.vercel.app'; // Replace with your local IP address if needed

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Send cookies with every request
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
