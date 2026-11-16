import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";
import toast from "react-hot-toast";
import { login } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ username: "", password: "" });

  const redirectTo = location.state?.from?.pathname || "/";

  // Already logged in? Skip the login page
  if (token) return <Navigate to={redirectTo} replace />;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(form)).unwrap();
      toast.success("Welcome back!");
      navigate(redirectTo, { replace: true });
    } catch {
      // error message is already in the Redux state
    }
  };

  const fillDemo = () => setForm({ username: "mor_2314", password: "83r5^_" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <FiShoppingBag className="mx-auto text-4xl text-indigo-600" />
          <h1 className="mt-2 text-2xl font-bold text-gray-800">Sign in to ShopEase</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <button
          type="button"
          onClick={fillDemo}
          className="mt-4 w-full text-center text-sm text-indigo-600 hover:underline"
        >
          Use demo account
        </button>
      </div>
    </div>
  );
};

export default Login;