import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import authSlice from "../page/Authentication/Login/authSlice";

const store = configureStore({
    reducer: {
       user: authSlice
    }
})

export default store;