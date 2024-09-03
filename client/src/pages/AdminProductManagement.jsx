import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', stock: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, newProduct);
      fetchProducts();
      setNewProduct({ name: '', description: '', price: '', category: '', stock: '' });
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please try again.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Product Management</h1>
      <form onSubmit={handleAddProduct} className="mb-12 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            required
            className="p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
          Add Product
        </button>
      </form>
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Product List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Category</th>
              <th className="border p-2 text-left">Stock</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map(product => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">${product.price.toFixed(2)}</td>
                  <td className="border p-2">{product.category}</td>
                  <td className="border p-2">{product.stock}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border p-2 text-center">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProductManagement;