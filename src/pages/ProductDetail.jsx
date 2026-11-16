import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import { getProductById } from "../services/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(id);
        if (ignore) return;
        // the API returns an empty body for an id that does not exist
        data ? setProduct(data) : setError("Product not found.");
      } catch {
        if (!ignore) setError("Could not load this product.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) return <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />;

  if (error)
    return (
      <div className="py-20 text-center">
        <p className="text-red-600">{error}</p>
        <Link to="/products" className="mt-4 inline-block text-indigo-600 hover:underline">
          Back to products
        </Link>
      </div>
    );

  return (
    <div className="space-y-6">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline">
        <FiArrowLeft /> Back to products
      </Link>

      <div className="grid gap-8 rounded-2xl bg-white p-6 shadow md:grid-cols-2">
        <div className="flex items-center justify-center p-4">
          <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium uppercase text-indigo-500">{product.category}</span>
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <div className="flex items-center gap-1 text-gray-600">
            <FaStar className="text-yellow-400" />
            {product.rating?.rate} ({product.rating?.count} reviews)
          </div>
          <p className="text-3xl font-extrabold text-gray-900">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>

          <button
            onClick={() => {
              dispatch(addToCart(product));
              toast.success("Added to cart");
            }}
            className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            <FiShoppingCart /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;