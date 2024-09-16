import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

import { Provider } from "react-redux";

import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(
    rootReducer,
    {},
    compose(composeWithDevTools(applyMiddleware(...[thunk])))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
