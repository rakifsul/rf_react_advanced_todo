import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import loginReducer from "../features/login/loginSlice";
import headerReducer from "../features/header/headerSlice";
import todoReducer from "../features/todo/todoSlice";

export const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        header: headerReducer,
        todo: todoReducer,
    },
});
