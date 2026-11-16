import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCart } from "../services/cartService";
import { logout } from "./authSlice";

const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => localStorage.setItem("cart", JSON.stringify(items));

export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const { items } = getState().cart;
      // This object is the request payload sent to the API
      return await createCart({
        userId,
        date: new Date().toISOString().split("T")[0],
        products: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
      });
    } catch {
      return rejectWithValue("Could not place order. Please try again.");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: loadCart(), ordering: false },
  reducers: {
    addToCart: (state, action) => {
      const p = action.payload;
      const existing = state.items.find((i) => i.id === p.id);
      if (existing) existing.quantity += 1;
      else
        state.items.push({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          quantity: 1,
        });
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveCart(state.items);
    },
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      saveCart(state.items);
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.ordering = true;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.ordering = false;
        state.items = [];
        saveCart(state.items);
      })
      .addCase(placeOrder.rejected, (state) => {
        state.ordering = false;
      })
      // Empty the cart when the user logs out
      .addCase(logout, (state) => {
        state.items = [];
        saveCart(state.items);
      });
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectCartTotal = (state) =>
  Math.round(
    state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0) * 100
  ) / 100;

export default cartSlice.reducer;