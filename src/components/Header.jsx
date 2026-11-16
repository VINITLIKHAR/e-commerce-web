import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingBag, FiShoppingCart, FiLogOut, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { logout } from "../redux/authSlice";
import { selectCartCount } from "../redux/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, username } = useSelector((state) => state.auth);
  const cartCount = useSelector(selectCartCount);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
            <FiShoppingBag />
            ShopEase
          </Link>
          <Link to="/products" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
            Products
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {token ? (
            <>
              <Link
                to="/cart"
                className="relative rounded-lg p-2 text-xl text-gray-700 hover:bg-gray-100"
                aria-label="Cart"
              >
                <FiShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <span className="hidden items-center gap-1 text-sm text-gray-600 sm:flex">
                <FiUser /> {username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;