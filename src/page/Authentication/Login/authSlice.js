import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../baseURL";
import ShowToast from '../../../components/ShowToast';
import axios from "axios";

const initialState = {
  msg: "",
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || "",
  isAuthenticate: null,
  loading: false,
  error: ""
};



// Sign in user thunk
export const signInUser = createAsyncThunk(
  'signinuser', 
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(`${baseURL}/drf-finance/login/`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData);
      }

      const data = await res.json();

      // Save token and user info to localStorage before dispatching loadUser
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));

      // After successful login, trigger loading the user data
      dispatch(loadUser());

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);


// Load user data if token exists
export const loadUser = createAsyncThunk(
  'auth/loadUser', 
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
        'Accept': 'application/json'
      }
    };

    try {
      const response = await axios.get(`${baseURL}/drf-finance/profiles/me/`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error loading user data');
    }
  }
);

export const chekAuthentication = createAsyncThunk(
  'auth/chekAuthentication', 
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
        'Accept': 'application/json'
      }
    };

    try {
      const response = await axios.get(`${baseURL}/drf-finance/token-status/`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error loading user data');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticate = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // SignIn cases
    builder.addCase(signInUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload.non_field_errors) {
        state.error = payload.non_field_errors;
        ShowToast('error', 'Username or password is incorrect');
      } else {
        state.msg = payload.msg;
        state.token = payload.token;
        state.isAuthenticate = true;
        // state.user = payload;
        ShowToast('success', 'Sign-in successful');
      }
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = false;

      if (action.payload?.non_field_errors) {
        state.error = action.payload.non_field_errors;
        ShowToast('error', action.payload.non_field_errors.join(', '));
      } else {
        state.error = action.error.message || 'An error occurred';
        ShowToast('error', state.error);
      }
    });

    // LoadUser cases
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      // ShowToast('success', 'User data loaded successfully');
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
      // ShowToast('error', 'Failed to load user data');
    });

    // Check Authentication cases
    builder.addCase(chekAuthentication.fulfilled, (state, { payload }) => {
      if (payload.status === "valid") {
        state.isAuthenticate = true;
      } else {
        state.isAuthenticate = false;
        state.token = null;
        state.user = null;
        localStorage.clear();
      }
    });
    builder.addCase(chekAuthentication.rejected, (state, action) => {
      state.isAuthenticate = false;
      state.error = action.payload || action.error.message;
    });

  },
});

// Export actions and selectors
export const { addToken, addUser, logout } = authSlice.actions;
// export const selectIsLoggedIn = (state) => !!state.user.token;
export const selectIsLoggedIn = (state) => state.user.isAuthenticate;
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;

export default authSlice.reducer;
