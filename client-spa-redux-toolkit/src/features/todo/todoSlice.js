import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    status: "",
    message: "",
    items: [],
    item: {
        _id: "",
        title: "",
        description: "",
    },
    noMoreItems: false,
};

axios.defaults.withCredentials = true;
const axiosConfig = {
    validateStatus: function (status) {
        return status >= 200;
    },
};

export const fetchGetAllTodos = createAsyncThunk(
    "todo/fetchGetAllTodos",
    async (args) => {
        try {
            const ret = await axios.get(
                "http://localhost:3001/todo/",
                {
                    headers: {
                        Authorization: sessionStorage.getItem("accessToken"),
                    },
                },
                axiosConfig
            );

            return ret.data;
        } catch (err) {
            console.log(err.message);
        }
    }
);

export const fetchGetLimitedTodos = createAsyncThunk(
    "todo/fetchGetLimitedTodos",
    async (args) => {
        const { page, perPage, query } = args;
        try {
            let url;

            if (query) {
                url = `http://localhost:3001/todo/?page=${page}&perPage=${perPage}&q=${query}`;
            } else {
                url = `http://localhost:3001/todo/?page=${page}&perPage=${perPage}`;
            }

            const ret = await axios.get(
                url,
                {
                    headers: {
                        Authorization: sessionStorage.getItem("accessToken"),
                    },
                },
                axiosConfig
            );
            // console.log(ret.data.data);
            return ret.data;
        } catch (err) {
            console.log(err.message);
        }
    }
);

export const fetchGetTodo = createAsyncThunk(
    "todo/fetchGetTodo",
    async (args) => {
        try {
            const ret = await axios.get(
                "http://localhost:3001/todo/" + args,
                {
                    headers: {
                        Authorization: sessionStorage.getItem("accessToken"),
                    },
                },
                axiosConfig
            );

            // console.log(ret.data.data);
            return ret.data;
        } catch (err) {
            console.log(err.message);
        }
    }
);

export const fetchCreateTodo = createAsyncThunk(
    "todo/fetchCreateTodo",
    async (args) => {
        try {
            // alert(args.title);
            const ret = await axios.post(
                "http://localhost:3001/todo/",
                args,
                {
                    headers: {
                        Authorization: sessionStorage.getItem("accessToken"),
                    },
                },
                axiosConfig
            );

            // console.log(ret.data.data);
            return ret.data;
        } catch (err) {
            console.log(err.message);
        }
    }
);

export const fetchEditTodo = createAsyncThunk(
    "todo/fetchEditTodo",
    async (args) => {
        try {
            // alert(args.title);
            const ret = await axios.put(
                "http://localhost:3001/todo/",
                args,
                {
                    headers: {
                        Authorization: sessionStorage.getItem("accessToken"),
                    },
                },
                axiosConfig
            );

            // console.log(ret.data.data);
            return ret.data;
        } catch (err) {
            console.log(err.message);
        }
    }
);

export const fetchDeleteTodo = createAsyncThunk(
    "todo/fetchDeleteTodo",
    async (args) => {
        try {
            // alert(args.title);
            let obj1 = {
                headers: {
                    Authorization: sessionStorage.getItem("accessToken"),
                },
            };

            let obj2 = { params: { id: args } };

            const ret = await axios.delete(
                "http://localhost:3001/todo/",
                {
                    ...obj1,
                    ...obj2,
                },
                axiosConfig
            );

            // console.log(ret.data.data);
            return ret.data;
        } catch (err) {
            console.log(err.message);
        }
    }
);

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        clearTodoItems: (state) => {
            console.log("clearTodoItems");
            state.items = [];
            state.noMoreItems = true;
        },
        clearTodoItemData: (state) => {
            state.item = {
                _id: "",
                title: "",
                description: "",
            };
        },
        setTodoItemTitle: (state, action) => {
            state.item = {
                ...state.item,
                title: action.payload,
            };
        },
        setTodoItemDescription: (state, action) => {
            state.item = {
                ...state.item,
                description: action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        //
        builder.addCase(fetchGetAllTodos.pending, (state) => {
            state.loading = true;
            state.status = "";
            state.message = "";
        });
        builder.addCase(fetchGetAllTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.items = action.payload.data;
        });
        builder.addCase(fetchGetAllTodos.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.items = [];
        });

        //
        builder.addCase(fetchGetLimitedTodos.pending, (state) => {
            state.loading = true;
            state.status = "";
            state.message = "";
            state.noMoreItems = false;
        });
        builder.addCase(fetchGetLimitedTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            // state.items.concat(action.payload.data); // not working
            // state.items = action.payload.data; //works
            state.items = state.items.concat(action.payload.data);
            state.noMoreItems = action.payload.data.length < 1 ? true : false;
        });
        builder.addCase(fetchGetLimitedTodos.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.items = [];
            state.noMoreItems = true;
        });

        //
        builder.addCase(fetchGetTodo.pending, (state) => {
            state.loading = true;
            state.status = "";
            state.message = "";
        });
        builder.addCase(fetchGetTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.item = action.payload.data;
        });
        builder.addCase(fetchGetTodo.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.item = {
                _id: "",
                title: "",
                description: "",
            };
        });

        //
        builder.addCase(fetchCreateTodo.pending, (state) => {
            state.loading = true;
            state.status = "";
            state.message = "";
        });
        builder.addCase(fetchCreateTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.item = action.payload.data;
        });
        builder.addCase(fetchCreateTodo.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.item = {
                _id: "",
                title: "",
                description: "",
            };
        });

        //
        builder.addCase(fetchEditTodo.pending, (state) => {
            state.loading = true;
            state.status = "";
            state.message = "";
        });
        builder.addCase(fetchEditTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.item = action.payload.data;
        });
        builder.addCase(fetchEditTodo.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.item = {
                _id: "",
                title: "",
                description: "",
            };
        });

        //
        builder.addCase(fetchDeleteTodo.pending, (state) => {
            state.loading = true;
            state.status = "";
            state.message = "";
        });
        builder.addCase(fetchDeleteTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.item = action.payload.data;
        });
        builder.addCase(fetchDeleteTodo.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.item = {
                _id: "",
                title: "",
                description: "",
            };
        });
    },
});

export default todoSlice.reducer;
export const {
    clearTodoItems,
    clearTodoItemData,
    setTodoItemTitle,
    setTodoItemDescription,
} = todoSlice.actions;
