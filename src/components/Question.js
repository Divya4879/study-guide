// src/components/Question.js
import React from 'react';

const Question = ({ question, onAnswer }) => {
    return (
        <div>
            <h3>{question.text}</h3>
            <div>
                {question.answers.map((answer, index) => (
                    <button key={index} onClick={() => onAnswer(answer.isCorrect)}>
                        {answer.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;