import { actionFullLogout } from "../actions/authActions";
import { actionOnChat, actionOnChatLeft } from "../actions/socketActions";
import { store } from "../reducers/combineReducers";
import { actionMsgOne } from "../reducers/chatReducers";
import { api } from "../constants";
import { backURL } from "../constants";
import { io } from "socket.io-client"

export const socket = io(backURL);

socket.on("jwt_ok", (data) => console.log(data));
socket.on("jwt_fail", (error) => {
    console.log(error);
    store.dispatch(actionFullLogout());
});

socket.on("msg", (msg) => {
    console.log("пришло смс");
    store.dispatch(actionMsgOne(msg));
});

socket.on("chat", (chat) => {
    console.log("нас добавили в чат");
    store.dispatch(actionOnChat(chat));

    const state = store.getState();
    socket.emit("jwt", state.auth.token);
});

socket.on("chat_left", (chat) => {
    console.log("нас выкинули из чата");
    store.dispatch(actionOnChatLeft(chat));
});
