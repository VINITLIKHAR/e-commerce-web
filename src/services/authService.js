import axiosInstance from "../api/axiosInstance";

export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data; // { token: "..." }
};

export const getUserIdFromToken = (token) => {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64)).sub;
  } catch {
    return 1; // fallback so the demo never breaks
  }
};