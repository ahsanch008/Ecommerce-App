import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-background overflow-hidden h-screen w-full -mt-5">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1665815844395-06f64f44b5e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl tracking-tight font-extrabold sm:text-4xl md:text-5xl">
          <span className="block xl:inline">Welcome to </span>{' '}
          <span className="block text-gray-950 xl:inline">URBANStore</span>
        </h1>
        <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
          Discover the latest trends in fashion and accessories. Shop our curated collection of stylish clothing and accessories for every occasion.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
          <div className="rounded-md shadow">
            <Link
              to="/products"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-sm text-white bg-gradient-to-r from-primary-gradient-start to-primary-gradient-end hover:opacity-90 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            {/* <Link
              to="/categories"
              className="w-full flex text-white items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-light hover:bg-primary-lighter md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              View Categories
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;