import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

// import { Counter } from "./features/counter/Counter";
import Header from "./features/header/Header";
import Login from "./features/login/Login";
import Register from "./features/register/Register";
import Todo from "./features/todo/Todo";
import Home from "./features/home/Home";

import "./App.css";

async function renewToken() {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (!refreshToken) {
        return;
    }

    axios.defaults.withCredentials = true;
    const axiosConfig = {
        validateStatus: function (status) {
            return status >= 200;
        },
    };
    const ret = await axios.post(
        "http://localhost:3001/auth/token",
        {
            refreshToken: refreshToken.split(" ")[1],
        },
        axiosConfig
    );

    sessionStorage.setItem("accessToken", ret.data.accessToken);
    sessionStorage.setItem("refreshToken", ret.data.refreshToken);
    return;
}

function App() {
    useEffect(() => {
        setInterval(() => {
            renewToken();
        }, 5000);
    }, []);

    return (
        <>
            <BrowserRouter>
                <Container>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/todo" element={<Todo />} />

                        <Route path="/login" element={<Login />} />

                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </>
    );
}

export default App;
