import { jwtDecode } from "../helpers/jwtDecode"

export function authReducer(state, { type, token }) {
    if (!state) {
        if (localStorage.authToken) {
            token = localStorage.authToken;
            type = "AUTH_LOGIN";
        } else {
            return {};
        }
    }
    if (type === "AUTH_LOGIN") {
        const payload = jwtDecode(token);
        if (typeof payload === "object") {
            localStorage.authToken = token;
            return {
                ...state,
                token,
                payload,
            };
        } else {
            console.error(
                "Токен " + localStorage.authToken + " неверный и был удален"
            );
            delete localStorage.authToken;
            return state || {};
        }
    }
    if (type === "AUTH_LOGOUT") {
        delete localStorage.authToken;
        return {};
    }
    return state;
}

export const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });
export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });