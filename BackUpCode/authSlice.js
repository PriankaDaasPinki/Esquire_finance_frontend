import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../baseURL";
import ShowToast from '../../../components/ShowToast'

const initialState = {
  msg: "",
  user: JSON.parse(localStorage.getItem("user")) || null,  
  token: localStorage.getItem("token") || "",
  loading: false,
  error: ""
};

export const signInUser = createAsyncThunk('signinuser', async (body) => {
  const res = await fetch(baseURL+"/drf-finance/login/", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body)
  });
  return await res.json();
});


const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state) => {
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {

      state.loading = false;

      if (payload.non_field_errors) {

        state.error = payload.non_field_errors;
        ShowToast('error','Username or password is incorrect')

      } else {

        state.msg = payload.msg;
        state.token = payload.token;
        state.user = payload;
        
        // Save to localStorage
        
        localStorage.setItem('msg', payload.msg);
        localStorage.setItem('token', payload.token);
        localStorage.setItem('user', JSON.stringify(payload));
        ShowToast('success','Sign-in successful')

      }
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      ShowToast('error','Username or password is incorrect')


    });
  },
});

export const { addToken, addUser, logout } = authSlice.actions;

export const selectIsLoggedIn = (state) => !!state.user.token;

export default authSlice.reducer;