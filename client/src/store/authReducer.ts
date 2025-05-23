import { getProfile, login, logout, signup } from "@/services/auth.service";
import type { User } from "@/utils/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialIsAuth = () => {
  const token = localStorage.getItem("TOKEN");
  const date = localStorage.getItem("expiryDate");
  if (!token || !date) {
    return false;
  }
  if (date && token) {
    const currentDate = new Date();
    const expiryDate = new Date(JSON.parse(date));
    if (currentDate > expiryDate) {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("expiryDate");
      return false;
    }
    return true;
  }
  return false;
};

const initUser = () => {
  return localStorage.getItem("USER")
    ? JSON.parse(localStorage.getItem("USER") as string)
    : null;
};
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  isLoggedin: boolean;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: initUser(),
  loading: false,
  error: null,
  token: null,

  isLoggedin: initialIsAuth(),
};

export const getLoginState = createAsyncThunk(
  "auth/getLocalStorageValue",
  async (_, thunkAPI) => {
    try {
      return await initialIsAuth();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// Async thunk for login
export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call
      const response = await login(userData);
      return response.user;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error);
    }
  }
);

// Async thunk for signup
export const signupAsync = createAsyncThunk(
  "auth/signupAsync",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call
      const response = await signup(userData);
      return response.user;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/get-user-details",
  async (_, { rejectWithValue }) => {
    try {
      return await getProfile();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      return await logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload?.token;
        toast.success(action.payload.message);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        toast.success(action.payload.message || "Signup successful");
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
    builder.addCase(getLoginState.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload;
    });
    builder
      .addCase(getLoginState.rejected, (state) => {
        state.error = "An error occurred while fetching login state.";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        // state.refreshToken = null;
        state.loading = false;
        state.isAuthenticated = false;
        state.error = "";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.error = "An error occurred during logout.";
        state.loading = false;
      });
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
