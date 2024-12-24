import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProductCard from './ProductCard';

const Favorites = () => {
  const { products, favorites } = useSelector((state: RootState) => state.products);
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Favorite Products</h1>
      {favoriteProducts.length === 0 ? (
        <p className="text-gray-600">No favorite products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;