import { store } from "../reducers/combineReducers";

export const authLoginValidator = () => store.getState().auth.token

