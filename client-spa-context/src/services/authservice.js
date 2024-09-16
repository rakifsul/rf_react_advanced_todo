import axios from "axios";

axios.defaults.withCredentials = true;
const axiosConfig = {
    validateStatus: function (status) {
        return status >= 200;
    },
};

export async function renewToken() {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (!refreshToken) {
        return;
    }

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

export async function login(data) {
    const ret = await axios.post(
        "http://localhost:3001/auth/login/",
        data,
        axiosConfig
    );
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ", ret.data);

    return ret;
}

export async function register(data) {
    const ret = await axios.post(
        "http://localhost:3001/auth/register/",
        data,
        axiosConfig
    );

    return ret;
}

export async function logout() {
    const ret = await axios.put(
        "http://localhost:3001/auth/logout/",
        {
            refreshToken: sessionStorage.getItem("refreshToken").split(" ")[1],
        },
        axiosConfig
    );

    return ret;
}
