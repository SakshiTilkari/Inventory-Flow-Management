import React from 'react';
import Sidebar from '../components/Sidebar';

const Stock = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6">
        <h1 className="text-2xl font-bold">Stock Entries</h1>
        {/* Stock form and entries list here */}
      </div>
    </div>
  );
};

export default Stock;