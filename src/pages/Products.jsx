import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories } from "../services/homeService";
import { getAllProducts, getProductsByCategory } from "../services/productService";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";
  const sort = params.get("sort") || "default";

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data =
          category === "all"
            ? await getAllProducts()
            : await getProductsByCategory(category);
        if (!ignore) setProducts(data);
      } catch {
        if (!ignore) setError("Could not load products.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [category]);

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating.rate - a.rating.rate);
    return list;
  }, [products, sort]);

  const setParam = (key, value, def) => {
    const next = new URLSearchParams(params);
    value === def ? next.delete(key) : next.set(key, value);
    setParams(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold capitalize text-gray-800">
          {category === "all" ? "All products" : category}
        </h1>
        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value, "default")}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {["all", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setParam("category", cat, "all")}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium capitalize ${
              category === cat
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 shadow hover:bg-indigo-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-xl bg-gray-200" />
            ))
          : sorted.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default Products;