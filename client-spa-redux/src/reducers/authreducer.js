const initialState = {
    currentAction: "",
    status: "",
    message: "",
    accessToken: sessionStorage.getItem("accessToken"),
    refreshToken: sessionStorage.getItem("refreshToken"),
    user: null,
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case "act-auth-reset-status-message":
            return {
                ...state,
                currentAction: action.type,
                status: initialState.status,
                message: initialState.message,
            };
        case "act-login-success":
            sessionStorage.setItem("accessToken", action.payload.accessToken);
            sessionStorage.setItem("refreshToken", action.payload.refreshToken);
            return {
                ...state,
                currentAction: action.type,
                status: action.payload.status,
                message: action.payload.message,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                user: action.payload.user,
            };
        case "act-login-failed":
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            return {
                ...state,
                currentAction: action.type,
                status: action.payload.status,
                message: action.payload.message,
                accessToken: null,
                refreshToken: null,
                user: null,
            };
        case "act-register-success":
            return {
                ...state,
                currentAction: action.type,
                status: action.payload.status,
                message: action.payload.message,
            };
        case "act-register-failed":
            return {
                ...state,
                currentAction: action.type,
                status: action.payload.status,
                message: action.payload.message,
            };
        case "act-logout-success":
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            return {
                currentAction: action.type,
                status: action.payload.status,
                message: action.payload.message,
                accessToken: null,
                refreshToken: null,
                user: null,
            };
        default:
            return state;
    }
}

export default authReducer;
