import React from "react";
import "./App.scss";
import "./resetStyle.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./reducers/combineReducers";
import { socket } from "./helpers/socket";
import { createBrowserHistory } from "history";
import { Provider, connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { CLogin } from "./pages/loginPage";
import { CRegistration } from "./pages/regPage";
import { Header } from "./components/header";
import { CProfilePage } from "./pages/profilePage";
import { CNewChatPage } from "./pages/NewChatPage";
import { CChangePass } from "./pages/profilePage/changePassword";
import { ChangesDone } from "./pages/profilePage/changeDonePage";
import { ChangesDoneForChats } from "./pages/ChangeDoneForChat";
import { AboutUs } from "./pages/aboutUs";
import { Redirect } from "react-router-dom";
import { CChatMsgs } from "./pages/oneChatPage";
import { CChatsAside } from "./pages/chatsAside";
import { CChatEditing } from "./pages/ChatEditing";

export const history = createBrowserHistory();

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

            <div className="mainContainer">
                <Route path="/main" component={CChatsAside} />
                <Route path="/main/:_id" component={CChatMsgs} />
            </div>

            <Route path="/login" component={CLogin} />
            <Route path="/registration" component={CRegistration} />
            <Route path="/newchat" component={CNewChatPage} />
            <Route path="/changepas" component={CChangePass} />
            <Route path="/changesdone" component={ChangesDone} />
            <Route path="/changesdonechats" component={ChangesDoneForChats} />
            <Route path="/chatediting/:_id" component={CChatEditing} />

            <Route path="/aboutus" component={AboutUs} />
            <Route path="/profile" component={CProfilePage} />

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
                    {/* <div className="main"> */}
                    <CAuthSwitch />
                    {/* </div> */}
                </Provider>
            </Router>
        </>
    );
}

export default App;
