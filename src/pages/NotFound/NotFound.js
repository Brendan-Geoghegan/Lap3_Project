import React from "react";
import notfound from "./notfound.png";
import "./notFound.css";
import { Link } from "react-router-dom";
import HomeButton from "../../components/HomeButton/HomeButton";
const NotFound = () => {
    return (
        <div>
            <div className="small-container">
                <div className="small">
                    <h3>PAGE NOT FOUND</h3>
                    <h4>Click the home button</h4>
                    <HomeButton />
                </div>
                <img src={notfound} alt="" />
            </div>
        </div>
    );
};

export default NotFound;
