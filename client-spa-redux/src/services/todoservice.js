import axios from "axios";

axios.defaults.withCredentials = true;

export async function getAllTodos() {
    const ret = await axios.get("http://localhost:3001/todo/", {
        headers: {
            Authorization: sessionStorage.getItem("accessToken"),
        },
    });

    return ret.data;
}

export async function getLimitedTodos(page, perPage, query) {
    let url;

    if (query) {
        url = `http://localhost:3001/todo/?page=${page}&perPage=${perPage}&q=${query}`;
    } else {
        url = `http://localhost:3001/todo/?page=${page}&perPage=${perPage}`;
    }

    const ret = await axios.get(url, {
        headers: {
            Authorization: sessionStorage.getItem("accessToken"),
        },
    });

    return ret.data;
}

export async function getTodo(id) {
    const ret = await axios.get("http://localhost:3001/todo/" + id, {
        headers: {
            Authorization: sessionStorage.getItem("accessToken"),
        },
    });

    return ret.data;
}

export async function createTodo(data) {
    const ret = await axios.post("http://localhost:3001/todo/", data, {
        headers: {
            Authorization: sessionStorage.getItem("accessToken"),
        },
    });
    // console.log(ret);
    return ret.data;
}

export async function editTodo(data) {
    const ret = await axios.put("http://localhost:3001/todo/", data, {
        headers: {
            Authorization: sessionStorage.getItem("accessToken"),
        },
    });

    return ret.data;
}

export async function deleteTodo(id) {
    let obj1 = {
        headers: {
            Authorization: sessionStorage.getItem("accessToken"),
        },
    };

    let obj2 = { params: { id: id } };

    const ret = await axios.delete("http://localhost:3001/todo/", {
        ...obj1,
        ...obj2,
    });

    return ret.data;
}
