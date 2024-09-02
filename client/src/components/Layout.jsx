import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 bg-white shadow-md rounded-lg mt-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;