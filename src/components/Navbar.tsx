
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Store, Heart, LogOut, PlusCircle } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">Shop</span>
          </Link>

          {/* Conditional Rendering Based on Authentication */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Links for Authenticated Users */}
                <Link
                  to="/favorites"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
                <Link
                  to="/products/new"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Add Product</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              // Links for Non-Authenticated Users
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                  Login
                </Link>
                <Link to="/register" className="text-gray-600 hover:text-indigo-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
