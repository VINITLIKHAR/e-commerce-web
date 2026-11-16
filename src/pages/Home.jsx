import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getFeaturedProducts } from "../services/homeService";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          getCategories(),
          getFeaturedProducts(8),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch {
        setError("Could not load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-12 text-center text-white sm:py-16">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Shop smarter, live better
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-indigo-100">
          Electronics, jewelery and fashion, all in one place.
        </p>
      </section>

      {/* Categories */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-800">Shop by category</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="rounded-xl bg-white p-5 text-center font-medium capitalize text-gray-700 shadow transition hover:bg-indigo-600 hover:text-white"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-800">Featured products</h2>

        {error && <p className="text-red-600">{error}</p>}

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;