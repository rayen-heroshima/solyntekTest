export interface User {
  id: number;
  email: string;
  username: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ProductsState {
  products: Product[];
  favorites: number[];
  loading: boolean;
  error: string | null;
}