// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import Result from './Result';

const Quiz = ({ topic }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const totalQuestions = 20; // Set the number of questions

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.post('https://api.groq.ai/v1/generate-quiz', {
                    topic,
                    numberOfQuestions: totalQuestions,
                }, {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                });
                setQuestions(res.data.questions); // Assuming the API returns an array of questions
            } catch (error) {
                console.error("Error fetching quiz questions", error);
            }
        };

        fetchQuestions();
    }, [topic]);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
    };

    return (
        <div>
            {showResult ? (
                <Result score={score} totalQuestions={questions.length} onRestart={handleRestart} />
            ) : (
                questions.length > 0 && (
                    <div>
                        <h2>Quiz on {topic}</h2>
                        <Question
                            question={questions[currentQuestion]}
                            onAnswer={handleAnswer}
                        />
                        <p>Question {currentQuestion + 1} of {questions.length}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default Quiz;