import React, { useState } from "react";
import happyhomer from "./happyhomer.svg";
import dohhomer from "./dohhomer.png";
import "./style.css";

export default function AnswerImage({ answerImg }) {
    return (
        <div>
            {answerImg === "correct" ? (
                <img className="correct" src={happyhomer} alt="happy homer" />
            ) : answerImg === "incorrect" ? (
                <img className="incorrect" src={dohhomer} alt="sad homer" />
            ) : undefined}
        </div>
    );
}
