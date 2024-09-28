import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    stock: '',
    images: []
  });

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const imageUrls = e.target.value.split(',').map(url => url.trim());
    setProduct({ ...product, images: imageUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in product) {
      if (key === 'price' || key === 'stock') {
        formData.append(key, Number(product[key]));
      } else if (key === 'images') {
        formData.append(key, JSON.stringify(product[key]));
      } else {
        formData.append(key, product[key]);
      }
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Product added:', response.data);
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
        stock: '',
        images: []
      });
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
            rows="3"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Subcategory</label>
          <input
            type="text"
            id="subcategory"
            name="subcategory"
            value={product.subcategory}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images (comma-separated URLs)</label>
          <input
            type="text"
            id="images"
            name="images"
            value={product.images.join(', ')}
            onChange={handleImageChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="http://example.com/image1.jpg, http://example.com/image2.jpg"
          />
        </div>
        <div>
          <button type="submit" className="w-full btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;