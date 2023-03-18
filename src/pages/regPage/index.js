import "./style.scss";
import logo from "../../images/logo.png";
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import { actionFullRegister } from "../../actions";
import { connect } from "react-redux";
import { passValidator } from "../../helpers/passValidator";

const Registration = ({ onReg }) => {
    const [login, setLogin] = useState("");
    const [nick, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    return (
        <div className="formContainerReg">
            <div className="logo__block__reg">
                <img className="logo" src={logo} alt='logo facogram'/>
            </div>
            <div className="formBlock">
                <div>
                    <h1 className="textLogin">Registration</h1>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Enter Login"
                        onChange={(e) => setLogin(e.target.value)}
                        className="inputSetting"
                    >
                        <Form.Control
                            type="text"
                            placeholder="text"
                            className="form-control-editing"
                            value={login}
                        />
                    </FloatingLabel>
                    <PasswordChecklist
                        rules={["minLength"]}
                        minLength={5}
                        value={login}
                        valueAgain={passwordAgain}
                        onChange={(isValid) => {}}
                        style={{paddingBottom: "10px"}}
                        messages={{
                            minLength: "Login has more than 5 characters.",
                        }}
                    />
                </div>
                <div>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Enter Nick"
                        onChange={(e) => setNick(e.target.value)}
                        className="inputSetting"
                    >
                        <Form.Control
                            type="text"
                            placeholder="text"
                            className="form-control-editing"
                            value={nick}
                        />
                    </FloatingLabel>
                    <PasswordChecklist
                        rules={["minLength"]}
                        minLength={5}
                        value={nick}
                        valueAgain={passwordAgain}
                        onChange={(isValid) => {}}
                        className="validator"
                        style={{paddingBottom: "10px"}}
                        messages={{
                            minLength: "Login has more than 5 characters.",
                        }}
                    />
                </div>
                <div>
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Enter Password"
                        className="inputSetting"
                    >
                        <Form.Control
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password:"
                            className="form-control-editing fix"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Repeat Password"
                        className="inputSetting"
                    >
                        <Form.Control
                            type="password"
                            onChange={(e) => setPasswordAgain(e.target.value)}
                            placeholder="Password Again"
                            className="form-control-editing fix"
                        />
                    </FloatingLabel>

                    <PasswordChecklist
                        rules={["minLength", "number", "capital", "match"]}
                        minLength={8}
                        value={password}
                        valueAgain={passwordAgain}
                        onChange={(isValid) => {}}
                        className="validator"
                        style={{paddingBottom: "10px"}}
                    />
                </div>
                <div className="d-flex loginForm">
                    <Button
                        variant="primary"
                        type="submit"
                        className="btn-setting"
                        onClick={() => {
                            onReg(login, password, nick);
                        }}
                        disabled={
                            login.length >= "5" && nick.length >= "5"
                                ? !passValidator(password, passwordAgain)
                                : true
                        }
                    >
                        <b>Register</b>
                    </Button>
                    <Link to="/login" className="registerLink alert-link">
                        Have an account? Login
                    </Link>
                </div>{" "}
            </div>
        </div>
    );
};

export const CRegistration = connect(null, { onReg: actionFullRegister })(
    Registration
);
