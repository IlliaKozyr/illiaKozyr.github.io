import "./style.scss";
import { Link } from "react-router-dom";
import { CLogoutBtn } from "../LogoutBtn";
import { Nav } from "react-bootstrap";
import { CMyAvatar } from "../avatars/Avatar";
import { CNickName } from "../../components/NickName";
import { Offcanvas } from "react-bootstrap";

export const Header = () => {
    return (
        <>
            <Link to="/main">
                <h1 className="logoH1">FAKOGRAM</h1>
            </Link>

            <div id="nav-container">
                <div class="bg"></div>
                <div class="button" tabindex="0">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
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
                                    About Us
                                </Link>
                            </div>
                        </Offcanvas.Body>
                        <CLogoutBtn />
                    </ul>
                </div>
            </div>
        </>
    );
};
