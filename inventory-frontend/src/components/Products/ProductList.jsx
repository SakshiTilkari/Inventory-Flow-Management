import { useState } from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onEdit }) => {
  const [filterCategory, setFilterCategory] = useState('');
  const [stockFilter, setStockFilter] = useState('all');

  const filteredProducts = products.filter((product) => {
    const categoryMatch = filterCategory ? product.category === filterCategory : true;
    let stockMatch = true;
    
    if (stockFilter === 'low') {
      stockMatch = product.quantity < 10;
    } else if (stockFilter === 'out') {
      stockMatch = product.quantity === 0;
    }
    
    return categoryMatch && stockMatch;
  });

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category
          </label>
          <select
            id="category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Stock
          </label>
          <select
            id="stock"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">All Products</option>
            <option value="low">Low Stock (&lt;10)</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductItem key={product._id} product={product} onEdit={onEdit} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;