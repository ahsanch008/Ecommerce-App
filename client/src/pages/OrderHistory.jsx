import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../components/axiosConfig';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Your Order History</h1>
      {orders.map(order => (
        <div key={order._id} className="border p-4 mb-4 rounded">
          <p>Order #{order._id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total.toFixed(2)}</p>
          <Link to={`/orders/${order._id}`} className="text-blue-500">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;