import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../helper/AxiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    isloggedin: localStorage.getItem('isloggedin') === "true",
    loginTimestamp: null,
    role: localStorage.getItem('role') || "",
    username: localStorage.getItem('username') || "",
    avatarUrl: localStorage.getItem('avatarUrl') || "",
};

export const createAccount = createAsyncThunk("/auth/signup", async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("users/register", data);
        return res.data;
    } catch (e) {
        const errorMessage = e?.response?.data?.message || "Registration failed";
        return rejectWithValue(errorMessage);
    }
});

export const login = createAsyncThunk("/auth/login", async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("users/login", data);
        return res.data;
    } catch (e) {
        const errorMessage = e?.response?.data?.message || "Login failed";
        return rejectWithValue(errorMessage);
    }
});

export const logout = createAsyncThunk("/auth/logout", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get("users/logout");
        return res.data;
    } catch (e) {
        const errorMessage = e?.response?.data?.message || "Logout failed";
        return rejectWithValue(errorMessage);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("isloggedin", "true");
                localStorage.setItem("role", action?.payload?.user?.role);
                localStorage.setItem("username", action?.payload?.user?.username);
                localStorage.setItem("avatarUrl", action?.payload?.user?.avatar?.url);
                state.isloggedin = true;
                state.loginTimestamp = Date.now();
                state.avatarUrl = action?.payload?.user?.avatar?.url;
                state.username = action?.payload?.user?.username;
                state.role = action?.payload?.user?.role;
            })
            .addCase(login.rejected, (state, action) => {
                console.log("Login failed:", action.payload);
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                localStorage.setItem("isloggedin", "true");
                localStorage.setItem("role", action?.payload?.user?.role);
                localStorage.setItem("username", action?.payload?.user?.username);
                localStorage.setItem("avatarUrl", action?.payload?.user?.avatar?.url);
                state.isloggedin = true;
                state.loginTimestamp = Date.now();
                state.avatarUrl = action?.payload?.user?.avatar?.url;
                state.username = action?.payload?.user?.username;
                state.role = action?.payload?.user?.role;
            })
            .addCase(createAccount.rejected, (state, action) => {
                console.log("Registration failed:", action.payload);
            })
            .addCase(logout.fulfilled, (state, action) => {
                localStorage.setItem("isloggedin", "false");
                localStorage.setItem("username", "");
                localStorage.setItem("role", "");
                localStorage.setItem("avatarUrl", "");
                state.isloggedin = false;
                state.avatarUrl = "";
                state.username = "";
                state.role = "";
            });
    }
});

export const {} = authSlice.actions;
export default authSlice.reducer;