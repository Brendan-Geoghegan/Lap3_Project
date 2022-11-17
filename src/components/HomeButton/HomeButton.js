import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const HomeButton = () => {
    const navigate = useNavigate();
    return (
        <button className="back-btn" onClick={() => navigate("/")}>
            Home
        </button>
    );
};

export default HomeButton;
