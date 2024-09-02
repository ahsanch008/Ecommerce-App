import React from 'react';
import Layout from './Layout';

function MainLayout({ children }) {
  return (
    <Layout>
    <div className="min-h-screen bg-white">
      {children}
    </div>
  </Layout>

  );
}

export default MainLayout;