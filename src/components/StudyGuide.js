import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Quiz from './Quiz';

const StudyGuide = () => {
    const [topic, setTopic] = useState('');
    const [educationLevel, setEducationLevel] = useState('200');
    const [response, setResponse] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://api.groq.ai/v1/generate', {
                prompt: `Generate a study guide on the topic of "${topic}" suitable for an education level of ${educationLevel} words.`,
                max_tokens: 500, // Adjust based on your needs
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            setResponse(res.data.text); // Adjust based on the actual response structure
        } catch (error) {
            console.error("Error fetching data from Groq API", error);
            setResponse("Error fetching data. Please try again.");
        }
    };

    const downloadPDF = () => {
        const input = document.getElementById('responseContainer');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save(`${topic}-study-guide.pdf`);
        });
    };

    return (
        <div>
            <h1>Study Guide Generator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                />
                <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                >
                    <option value="200">200 words</option>
                    <option value="300">300 words</option>
                    <option value="500">500 words</option>
                </select>
                <button type="submit">Generate Study Guide</button>
            </form>
            {response && (
                <div id="responseContainer" style={{ marginTop: '20px' }}>
                    <h2>Generated Study Guide:</h2>
                    <p>{response}</p>
                    <button onClick={downloadPDF}>Download as PDF</button>
                </div>
            )}
            <button onClick={() => setShowQuiz(true)}>Take Quiz</button>
            {showQuiz && <Quiz topic={topic} />}
        </div>
    );
};

export default StudyGuide;