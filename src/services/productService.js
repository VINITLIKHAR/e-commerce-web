import axiosInstance from "../api/axiosInstance";

export const getAllProducts = async () => {
  const { data } = await axiosInstance.get("/products");
  return data;
};

export const getProductsByCategory = async (category) => {
  const { data } = await axiosInstance.get(
    `/products/category/${encodeURIComponent(category)}`
  );
  return data;
};


// product details 
export const getProductById = async (id) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};