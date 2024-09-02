import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../components/axiosConfig';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]); // Add state for categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('');
    }
  }, [location.search]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        search: searchQuery,
        category: selectedCategory
      };
     
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, { params });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      
      // Extract unique categories from products
      const uniqueCategories = [...new Set(response.data.products.map(product => product.category))];
      setCategories(uniqueCategories);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div></div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className=" min-h-screen animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full bg-center bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
        <div className="absolute inset-0 bg-black opacity-35"></div> {/* Optional overlay for better text visibility */}
        <div className="relative z-10 flex justify-center items-center h-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 text-center animate-slide-in">
            Our Products
          </h2>
        </div>
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col items-center space-y-4 animate-slide-in">
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-slide-in">
          {products.map((product) => (
            <div key={product._id} className="flex flex-col h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="mt-16 text-center text-primary animate-slide-in">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
