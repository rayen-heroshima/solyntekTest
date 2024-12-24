import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, Edit, Trash } from 'lucide-react';
import { toggleFavorite } from '../../store/slices/productsSlice';
import { RootState } from '../../store';
import { Product } from '../../types';
import { deleteProduct } from '../../services/api';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.products.favorites);
  const isFavorite = favorites.includes(product.id);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product.id);
        // Refresh products list after deletion
        window.location.reload();
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <button
            onClick={() => dispatch(toggleFavorite(product.id))}
            className={`p-1 rounded-full ${
              isFavorite ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</p>
        
        <div className="flex justify-end space-x-2 mt-4">
          <Link
            to={`/products/edit/${product.id}`}
            className="p-2 text-gray-600 hover:text-indigo-600"
          >
            <Edit className="h-5 w-5" />
          </Link>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-600 hover:text-red-600"
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;