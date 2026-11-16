import axiosInstance from "../api/axiosInstance";

export const getCategories = async () => {
  const { data } = await axiosInstance.get("/products/categories");
  if (!Array.isArray(data)) throw new Error("Invalid categories response");
  return data;
};

export const getFeaturedProducts = async (limit = 8) => {
  const { data } = await axiosInstance.get(`/products?limit=${limit}`);
  if (!Array.isArray(data)) throw new Error("Invalid products response");
  return data;
};