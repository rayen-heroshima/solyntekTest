import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getProducts } from '../../services/api';
import { setProducts, setLoading, setError } from '../../store/slices/productsSlice';
import { RootState } from '../../store';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import SortSelect from './SortSelect';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getProducts(1, 10, search, sort);
        dispatch(setProducts(data));
      } catch (err) {
        dispatch(setError('Failed to fetch products'));
      }
    };
    fetchProducts();
  }, [dispatch, search, sort]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/products/new"
          className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </Link>
      </div>
      
      <div className="flex space-x-4 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;