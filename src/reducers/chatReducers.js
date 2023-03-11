export function chatsReducer(state, { type, payload }) {
    if (!state) {
        return {};
    }
    function refreshMsgs(newMsgs, oldMsgs) {
        const msgState = [...oldMsgs];

        for (const newMsg of newMsgs || []) {
            const currIndex = msgState.findIndex(
                (oldMsg) => oldMsg._id === newMsg._id
            );

            if (currIndex === -1) {
                msgState.push(newMsg);
            } else {
                msgState[currIndex] = newMsg;
            }
        }
        const newMsgState = msgState.sort((a, b) => {
            if (a._id > b._id) {
                return 1;
            }
            if (a._id < b._id) {
                return -1;
            }
            return 0;
        });

        return newMsgState;
    }

    function getInfoAboutNext(msgState) {
        const informedState = [];

        for (let i = 0; i < msgState.length; i++) {
            const msg = msgState[i];

            msg.nextMsg = msgState[i + 1] || null;
            informedState.push(msg);
        }

        return informedState;
    }

    function sortChats(unsortedChats) {
        return Object.fromEntries(
            Object.entries(unsortedChats).sort((a, b) => {
                if (a[1].lastModified > b[1].lastModified) {
                    return -1;
                }
                if (a[1].lastModified < b[1].lastModified) {
                    return 1;
                }
                return 0;
            })
        );
    }

    const types = {
        CHATS() {
            if (payload) {
                const oldChats = { ...state };

                for (const chat of payload) {
                    const oldChat = oldChats[chat._id];

                    if (!oldChat) {
                        oldChats[chat._id] = { ...chat };
                    } else
                        for (const key in chat) {
                            const oldValue = oldChat[key];
                            const newValue = chat[key];

                            if (newValue) {
                                if (key === "messages") {
                                    oldChats[chat._id][key] = getInfoAboutNext(
                                        refreshMsgs(newValue, oldValue)
                                    );
                                } else {
                                    oldChats[chat._id][key] = newValue;
                                }
                            } else {
                                oldChats[chat._id][key] = oldValue;
                            }
                        }
                }

                const newState = sortChats(oldChats);

                return newState;
            }
            return state;
        },

        CHAT_LEFT() {
            const { [payload._id]: removed, ...newState } = state;
            return newState;
        },

        CHATS_CLEAR() {
            return {};
        },

        MSGS() {
            if (payload && payload.length > 0) {
                const chatId = payload[0]?.chat?._id;

                const msgState = state[chatId]?.messages || [];

                const newMsgState = getInfoAboutNext(
                    refreshMsgs(payload, msgState)
                );

                const newState = {
                    ...state,
                    [chatId]: {
                        ...state[chatId],
                        messages: newMsgState,
                    },
                };

                return newState;
            }
            return state;
        },
    };
    if (type in types) {
        return types[type]();
    }
    return state;
}

export const actionChatList = (chats) => ({ type: "CHATS", payload: chats });
export const actionChatOne = (chat) => ({ type: "CHATS", payload: [chat] });
export const actionChatLeft = (chat) => ({ type: "CHAT_LEFT", payload: chat });
export const actionChatsClear = () => ({ type: "CHATS_CLEAR" });

export const actionMsgList = (msgs) => ({ type: "MSGS", payload: msgs });
export const actionMsgOne = (msg) => ({ type: "MSGS", payload: [msg] });