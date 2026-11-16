import axiosInstance from "../api/axiosInstance";

export const createCart = async (cart) => {
  const { data } = await axiosInstance.post("/carts", cart);
  return data;
};