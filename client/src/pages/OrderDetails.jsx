import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../components/axiosConfig';

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Order #{order._id}</h1>
      <p>Status: {order.status}</p>
      <p>Total: ${order.total.toFixed(2)}</p>
      <h2 className="text-2xl font-bold mt-4 mb-2">Items:</h2>
      {order.items.map(item => (
        <div key={item._id} className="border-b py-2">
          <p>{item.product.name} - Quantity: {item.quantity}</p>
          <p>Price: ${item.price.toFixed(2)}</p>
        </div>
      ))}
      <h2 className="text-2xl font-bold mt-4 mb-2">Shipping Address:</h2>
      <p>{order.shippingAddress}</p>
      <h2 className="text-2xl font-bold mt-4 mb-2">Payment Information:</h2>
      <p>Method: {order.paymentInfo.method}</p>
    </div>
  );
}

export default OrderDetails;