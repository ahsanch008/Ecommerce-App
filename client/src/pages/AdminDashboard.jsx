import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../components/axiosConfig';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    pendingReviews: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard-stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Products" value={stats.totalProducts} link="/admin/products" />
        <DashboardCard title="Total Users" value={stats.totalUsers} link="/admin/users" />
        <DashboardCard title="Total Orders" value={stats.totalOrders} link="/admin/orders" />
        <DashboardCard title="Pending Reviews" value={stats.pendingReviews} link="/admin/reviews" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickLinkCard title="Product Management" link="/admin/products" description="Add, edit, or remove products" />
        <QuickLinkCard title="User Management" link="/admin/users" description="Manage user accounts and permissions" />
        <QuickLinkCard title="Order Management" link="/admin/orders" description="View and update order statuses" />
        <QuickLinkCard title="Review Management" link="/admin/reviews" description="Moderate customer reviews" />
      </div>
    </div>
  );
}

function DashboardCard({ title, value, link }) {
  return (
    <Link to={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-red-500">{value}</p>
    </Link>
  );
}

function QuickLinkCard({ title, link, description }) {
  return (
    <Link to={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}

export default AdminDashboard;