import { gql } from "../helpers";
import { actionChatsCount } from "../actions/chatsActions";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./authReducers";
import { chatsReducer } from "./chatReducers";
import { promiseReducer } from "./promiseReducer";
import { actionPromise } from "./promiseReducer";

export const actionUserFindOne = (userId, name = "findUserOne") =>
    actionPromise(
        name,
        gql(
            `query findUserOne($q: String) {
      UserFindOne (query: $q){
         _id
         createdAt
         login
         nick
         avatar {
            _id
            url
         }
         chats{
            avatar {
                _id
                url
             }
            messages {
                _id
                createdAt
                text
                        owner {
                          _id
                          createdAt
                          login
                          nick
                        }
                media {
                  _id
                  createdAt
                  text
                  url
                  originalFileName
                  type
                }
              }
            _id
            createdAt
            title
            lastMessage {
                _id
                createdAt
                text
            }
        }
    }
}
`,
            {
                q: JSON.stringify([{ _id: userId }]),
            }
        )
    );

export const actionAboutMe = () => async (dispatch, getState) => {
    let { auth } = getState();
    let id = auth?.payload?.sub?.id;
    if (id) {
        await dispatch(actionUserFindOne(id, "myProfile"));
        await dispatch(actionChatsCount(id));
    }
};

// -----------------------

export const store = createStore(
    combineReducers({
        auth: authReducer,
        chats: chatsReducer,
        promise: promiseReducer,
    }),

    applyMiddleware(thunk)
);

store.dispatch(actionAboutMe());

store.subscribe(() => console.log(store.getState()));
