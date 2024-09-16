import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    status: "",
    message: "",
    accessToken: sessionStorage.getItem("accessToken"),
    refreshToken: sessionStorage.getItem("refreshToken"),
};

axios.defaults.withCredentials = true;
const axiosConfig = {
    validateStatus: function (status) {
        return status >= 200;
    },
};

export const fetchLogout = createAsyncThunk("header/fetchLogout", async () => {
    try {
        const ret = await axios.put(
            "http://localhost:3001/auth/logout/",
            {
                refreshToken: sessionStorage
                    .getItem("refreshToken")
                    .split(" ")[1],
            },
            axiosConfig
        );

        return ret.data;
    } catch (err) {
        console.log(err.message);
    }
});

const headerSlice = createSlice({
    name: "header",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchLogout.pending, (state) => {
            state = initialState;
        });

        builder.addCase(fetchLogout.fulfilled, (state, action) => {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");

            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.accessToken = null;
            state.refreshToken = null;
        });

        builder.addCase(fetchLogout.rejected, (state, action) => {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");

            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.accessToken = null;
            state.refreshToken = null;
        });
    },
});

export default headerSlice.reducer;
