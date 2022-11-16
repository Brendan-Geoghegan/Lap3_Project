import React, { useState } from 'react';
import happyhomer from './style.css';
import dohhomer from './style.css';

export default function AnswerImage() {
    const [answer, setAnswer] = useState('');
    return (
        <div>
            {answer === 'correct' ? (
                <img src={happyhomer} alt="happy homer" />
            ) : (
                <img src={happyhomer} alt="sad homer" />
            )}
        </div>
    );
}
