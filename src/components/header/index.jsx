import "./style.scss";
import { Link } from "react-router-dom";
import { CLogoutBtn } from "../LogoutBtn";
import { CMyAvatar } from "../avatars/Avatar";
import { CNickName } from "../../components/NickName";
import { Offcanvas } from "react-bootstrap";

export const Header = () => {
    return (
        <>
            <Link to="/main">
                <h1 className="logoH1">
                    <span className="logoSpan">FACO</span>
                    <span className="logoSpan">GRAM</span>
                </h1>
            </Link>

            <div id="nav-container">
                <div className="bg"></div>
                <div className="button" tabindex="0">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </div>
                <div id="nav-content" tabindex="0">
                    <ul>
                        <Offcanvas.Body>
                            <div className="loginAvatar">
                                <CMyAvatar />
                                <CNickName />
                            </div>
                            <div className="">
                                <Link className="nav" to="/profile">
                                    Profile
                                </Link>
                                <Link className="nav" to="/aboutus">
                                    About Project
                                </Link>
                                <CLogoutBtn />
                            </div>
                        </Offcanvas.Body>
                    </ul>
                </div>
            </div>
        </>
    );
};
