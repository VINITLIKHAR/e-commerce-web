import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="flex flex-col overflow-hidden rounded-xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-48 items-center justify-center p-4">
        <img src={product.image} alt={product.title} className="h-full object-contain" loading="lazy" />
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t p-4">
        <span className="text-xs font-medium uppercase text-indigo-500">{product.category}</span>
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">{product.title}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <FaStar className="text-yellow-400" />
          {product.rating?.rate} ({product.rating?.count})
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <FiShoppingCart /> Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;