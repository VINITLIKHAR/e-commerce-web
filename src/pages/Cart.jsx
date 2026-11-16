import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  placeOrder,
  selectCartTotal,
} from "../redux/cartSlice";
import { getUserIdFromToken } from "../services/authService";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, ordering } = useSelector((state) => state.cart);
  const total = useSelector(selectCartTotal);
  const token = useSelector((state) => state.auth.token);

  const handlePlaceOrder = async () => {
    try {
      await dispatch(placeOrder(getUserIdFromToken(token))).unwrap();
      toast.success("Order placed successfully!");
      navigate("/");
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Something went wrong");
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Looks like you have not added anything yet.</p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Shopping cart</h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-red-600 hover:underline"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow sm:flex-row sm:items-center"
            >
              <img src={item.image} alt={item.title} className="h-24 w-24 object-contain" />

              <div className="flex-1">
                <Link
                  to={`/products/${item.id}`}
                  className="line-clamp-2 font-semibold text-gray-800 hover:text-indigo-600"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-gray-500">${item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  disabled={item.quantity === 1}
                  className="rounded-lg border p-2 hover:bg-gray-100 disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="w-6 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="rounded-lg border p-2 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>

              <p className="w-24 font-bold text-gray-900 sm:text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove item"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-bold text-gray-800">Order summary</h2>
          <div className="mt-4 flex justify-between text-gray-600">
            <span>Items</span>
            <span>{items.reduce((sum, i) => sum + i.quantity, 0)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t pt-4 text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={ordering}
            className="mt-6 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {ordering ? "Placing order..." : "Place order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;