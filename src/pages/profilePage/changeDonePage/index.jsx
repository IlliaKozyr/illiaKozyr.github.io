import React from "react";
import "./style.scss"
import { Link } from "react-router-dom";

export const ChangesDone = () => {
    return (
        <div className="profileBlock">
            <h1>Changes saved ✔</h1>

            <Link to="/profile" className="changepasLink">
                Back to profile
            </Link>
        </div>
    );
};
