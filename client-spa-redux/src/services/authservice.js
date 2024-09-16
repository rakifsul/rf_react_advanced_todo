import axios from "axios";

axios.defaults.withCredentials = true;
const axiosConfig = {
    validateStatus: function (status) {
        return status >= 200;
    },
};

export async function authLogin(data) {
    const ret = await axios.post(
        "http://localhost:3001/auth/login/",
        data,
        axiosConfig
    );
    console.log(ret);
    return ret.data;
}

export async function authRegister(data) {
    const ret = await axios.post(
        "http://localhost:3001/auth/register/",
        data,
        axiosConfig
    );
    return ret.data;
}

export async function authLogout() {
    const ret = await axios.put(
        "http://localhost:3001/auth/logout/",
        {
            refreshToken: sessionStorage.getItem("refreshToken").split(" ")[1],
        },
        axiosConfig
    );
    return ret.data;
}
