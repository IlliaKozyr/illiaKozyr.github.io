import React from "react";
import "./resetStyle.scss";
import "./App.scss"
import { store } from "./reducers/combineReducers";
import { socket } from "./helpers/socket"
import createHistory from "history/createBrowserHistory";
import { Provider, connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { CLogin } from "./pages/loginPage";
import { CRegistration } from "./pages/regPage";
import { Header } from "./components/header";
import { CProfilePage } from "./pages/ProfilePage";
import { CNewChatPage } from "./pages/NewChatPage";
import { CChangePass } from "./pages/ChangePassPage";
import { ChangesDone } from "./pages/ChangesDonePage";
import { ChangesDoneForChats } from "./pages/ChangeDoneForChat";
import { AboutUs } from "./pages/AboutUs";
import { Redirect } from "react-router-dom";
import { CChatMsgs } from "./pages/ChatMsgsPage";
import { CChatsAside } from "./pages/ChatsAside";
import { CChatEditing } from "./pages/ChatEditing";

export const history = createHistory();

const AuthSwitch = ({ token }) => {

    if (token) {
        console.log("подключение сокета");
        socket.emit("jwt", token);
    }

    return (
        <>
            <Switch>
                <Route path="/login" component={() => <></>} />
                <Route path="/registration" component={() => <></>} />
                <Header />
            </Switch>
            <Route path="/login" component={CLogin} />
            <Route path="/registration" component={CRegistration} />
            <Route path="/profile" component={CProfilePage} />
            <Route path="/newchat" component={CNewChatPage} />
            <Route path="/changepas" component={CChangePass} />
            <Route path="/changesdone" component={ChangesDone} />
            <Route path="/changesdonechats" component={ChangesDoneForChats} />
            <Route path="/chatediting/:_id" component={CChatEditing} />
            <Route path="/aboutus" component={AboutUs} />
            <div className="mainContainer">
                <Route path="/main" component={CChatsAside} />

                <Route path="/main/:_id" component={CChatMsgs} exact/>
            </div>
            <Redirect to={token === undefined ? "/login" : "/main"} />
        </>
    );
};

const CAuthSwitch = connect((state) => ({ token: state.auth?.token }))(
    AuthSwitch
);

function App() {
    return (
        <>
            <Router history={history}>
                <Provider store={store}>
                    <div className="mainContainer">
                        <CAuthSwitch />
                    </div>
                </Provider>
            </Router>
        </>
    );
}

export default App;