import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const HomeButton = () => {
    const navigate = useNavigate();
    return (
        <button className="back-btn" onClick={() => navigate(-1)}>
            Home
        </button>
    );
};

export default HomeButton;
