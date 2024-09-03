import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from '../components/axiosConfig';
import { Link } from 'react-router-dom';

function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address || '');
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/user`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/profile`, { name, email, address });
      updateUser(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full bg-center bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512850183-6d7990f42385?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80')` }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-8 text-center animate-slide-in">
            Your Orders
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        

        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-in">
            {orders.map((order) => (
              <div key={order._id} className="bg-white shadow-lg  overflow-hidden">
                <div className="p-4">
                  <h3 className="text-md font-semibold mb-2">Order #{order._id}</h3>
                  <p className="text-gray-600 mb-2">Status: {order.status}</p>
                  <p className="text-gray-600 mb-4">Total: Rs {order.total.toFixed(2)}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Items:</h4>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-42 h-64 object-cover rounded mr-4"
                        />
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link 
                    to={`/orders/${order._id}`} 
                    className="inline-block bg-red-500 text-white px-4 py-2  hover:bg-red-600 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 animate-slide-in">You haven't placed any orders yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;