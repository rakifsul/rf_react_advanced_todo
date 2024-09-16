import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    status: "",
    message: "",
};

axios.defaults.withCredentials = true;
const axiosConfig = {
    validateStatus: function (status) {
        return status >= 200;
    },
};

export const fetchRegister = createAsyncThunk(
    "register/fetchRegister",
    async (args) => {
        try {
            const ret = await axios.post(
                "http://localhost:3001/auth/register/",
                args,
                axiosConfig
            );

            return ret.data;
        } catch (err) {
            console.log(err.message);
        }
    }
);

const registerSlice = createSlice({
    name: "register",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRegister.pending, (state) => {
            state.loading = true;
            state.status = "";
            state.message = "";
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
        });
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
        });
    },
});

export default registerSlice.reducer;
