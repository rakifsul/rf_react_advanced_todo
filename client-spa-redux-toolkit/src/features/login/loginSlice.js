import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    status: "",
    message: "",
    accessToken: sessionStorage.getItem("accessToken"),
    refreshToken: sessionStorage.getItem("refreshToken"),
    user: null,
};

axios.defaults.withCredentials = true;
const axiosConfig = {
    validateStatus: function (status) {
        return status >= 200;
    },
};

export const fetchLogin = createAsyncThunk("login/fetchLogin", async (args) => {
    try {
        const ret = await axios.post(
            "http://localhost:3001/auth/login/",
            args,
            axiosConfig
        );

        return ret.data;
    } catch (err) {
        console.log(err.message);
    }
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.loading = true;
            state.status = "";
            state.message = "";
            state.accessToken = sessionStorage.getItem("accessToken");
            state.refreshToken = sessionStorage.getItem("refreshToken");
            state.user = null;
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            sessionStorage.setItem("accessToken", action.payload.accessToken);
            sessionStorage.setItem("refreshToken", action.payload.refreshToken);

            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");

            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
        });
    },
});

export default loginSlice.reducer;
