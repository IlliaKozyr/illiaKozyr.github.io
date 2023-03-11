import "./style.scss";
import { Link } from "react-router-dom";
import { CLogoutBtn } from "../LogoutBtn";

export const Header = () => {
    return (
        <>
            <h1>FAKOGRAM</h1>

            <div id="nav-container">
                <div class="bg"></div>
                <div class="button" tabindex="0">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </div>
                <div id="nav-content" tabindex="0">
                    <ul>
                        <Link className="nav" to="/profile">
                            Profile
                        </Link>
                        <Link className="nav" to="aboutus">
                            About Us
                        </Link>
                        <CLogoutBtn />
                    </ul>
                </div>
            </div>
        </>
    );
};
