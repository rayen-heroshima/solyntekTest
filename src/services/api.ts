import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log(localStorage.getItem('token'))
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const response = await api.post(
    '/token',
    new URLSearchParams({ username, password }).toString(), // Form data
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  
  console.log(response.data); // Log the response to check its structure
  return {
    token: response.data.access_token, // Extract the token
    user: response.data.user,          // If user data is included, extract it
  };
};



export const register = async (email: string, password: string, username: string) => {
  const response = await api.post('/register', { email,username,password });
  return response.data;
};

export const getProducts = async (page = 1, limit = 10, search = '', sort = '') => {
  const response = await api.get('/products', {
    params: { page, limit, search, sort },
  });
  return response.data;
};

export const createProduct = async (productData: any) => {
  const response = await api.post('/products', productData);
  return response.data;
};


export const updateProduct = async (id: number, productData: any) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  await api.delete(`/products/${id}`);
};