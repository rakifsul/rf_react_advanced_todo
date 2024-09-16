import { authLogin, authRegister, authLogout } from "../services/authservice";

export const register = (email, password, repeatPassword) => {
    return async (dispatch) => {
        const { status, message } = await authRegister({
            email,
            password,
            repeatPassword,
        });

        if (status === "ok") {
            dispatch({
                type: "act-register-success",
                payload: {
                    status,
                    message,
                },
            });

            await dispatch({
                type: "act-auth-reset-status-message",
            });
            return;
        }

        dispatch({
            type: "act-register-failed",
            payload: {
                status,
                message,
            },
        });

        await dispatch({
            type: "act-auth-reset-status-message",
        });
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        const ret = await authLogin({
            email,
            password,
        });

        const { status, message, accessToken, refreshToken, user } = ret;
        if (status === "ok") {
            await dispatch({
                type: "act-login-success",
                payload: {
                    status,
                    message,
                    accessToken,
                    refreshToken,
                    user,
                },
            });

            await dispatch({
                type: "act-auth-reset-status-message",
            });
            return;
        }

        await dispatch({
            type: "act-login-failed",
            payload: {
                status,
                message,
                accessToken,
                refreshToken,
                user,
            },
        });

        await dispatch({
            type: "act-auth-reset-status-message",
        });
    };
};

export const logout = () => {
    return async (dispatch) => {
        const { status, message, user } = await authLogout();
        dispatch({
            type: "act-logout-success",
            payload: {
                status,
                message,
                user,
            },
        });

        await dispatch({
            type: "act-auth-reset-status-message",
        });
    };
};
