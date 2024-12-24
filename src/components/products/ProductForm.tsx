import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProducts } from '../../services/api';

interface ProductData {
  name: string;
  description: string;
  price: string;
  image_url: string;
}

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    description: '',
    price: '',
    image_url: '',
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const products = await getProducts();
          const product = products.find((p) => p.id === parseInt(id));
          if (product) {
            setProductData({
              name: product.name,
              description: product.description,
              price: product.price.toString(),
              image_url: product.image_url,
            });
          }
        } catch (err) {
          setError('Failed to fetch product');
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleUpdateField = (field: keyof ProductData, value: string) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (id) {
        await updateProduct(parseInt(id), productData);
      } else {
        await createProduct(productData);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to save product');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'Add'} Product</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={productData.name}
            onChange={(e) => handleUpdateField('name', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={productData.description}
            onChange={(e) => handleUpdateField('description', e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={productData.price}
            onChange={(e) => handleUpdateField('price', e.target.value)}
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={productData.image_url}
            onChange={(e) => handleUpdateField('image_url', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {id ? 'Update' : 'Create'} Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
