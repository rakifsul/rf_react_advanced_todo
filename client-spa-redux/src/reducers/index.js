import { combineReducers } from "redux";

import todoreducer from "./todoreducer";
import authreducer from "./authreducer";

export default combineReducers({
    todos: todoreducer,
    auth: authreducer,
});
