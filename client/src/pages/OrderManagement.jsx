import React, { useState, useEffect } from 'react';
import axios from '../components/axiosConfig';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/all/get`, {
        withCredentials: true
      });	
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading orders...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-600">
        <p>{error}</p>
        <button 
          onClick={fetchOrders} 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Order Management</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Order ID</th>
                <th className="border p-2 text-left">User</th>
                <th className="border p-2 text-left">Total</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="border p-2">{order._id}</td>
                  <td className="border p-2">{order.user?.name || 'N/A'}</td>
                  <td className="border p-2">${order.total.toFixed(2)}</td>
                  <td className="border p-2">{order.status}</td>
                  <td className="border p-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderManagement;