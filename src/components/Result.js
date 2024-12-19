// src/components/Result.js
import React from 'react';

const Result = ({ score, totalQuestions, onRestart }) => {
    return (
        <div>
            <h2>Your Score: {score} out of {totalQuestions}</h2>
            <button onClick={onRestart}>Restart Quiz</button>
        </div>
    );
};

export default Result;