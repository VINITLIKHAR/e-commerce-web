import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../services/authService";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return { token: data.token, username: credentials.username };
    } catch (err) {
      return rejectWithValue(
        typeof err.response?.data === "string"
          ? err.response.data
          : "Login failed. Please try again."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("username", action.payload.username);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;