"use client";
import { useState } from 'react';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [classId, setClassId] = useState('');

    const fetchQuiz = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic,
                    difficulty,
                    classId,
                }),
            });

            const data = await response.json();
            console.log('Server response:', data);

            // Check if data.quiz is an array
            if (Array.isArray(data.quiz)) {
                setQuestions(data.quiz);
            } else {
                console.error('Quiz data is not an array:', data.quiz);
                setQuestions([]);
            }
        } catch (error) {
            console.error('Error fetching quiz:', error);
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (index, answer) => {
        setUserAnswers((prev) => ({
            ...prev,
            [index]: answer,
        }));
    };

    const calculateScore = () => {
        let correctAnswers = 0;

        questions.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                correctAnswers += 1;
            }
        });

        setScore(correctAnswers);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Quiz Maker</h1>

            <div className="space-y-4 mb-6">
                <label className="block text-gray-700">
                    <span className="text-lg font-semibold">Topic:</span>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </label>
                <label className="block text-gray-700">
                    <span className="text-lg font-semibold">Difficulty:</span>
                    <input
                        type="text"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </label>
                <label className="block text-gray-700">
                    <span className="text-lg font-semibold">Class ID:</span>
                    <input
                        type="text"
                        value={classId}
                        onChange={(e) => setClassId(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </label>
                <button
                    onClick={fetchQuiz}
                    className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Generate Quiz
                </button>
            </div>

            {loading && <p className="text-center text-gray-600">Loading...</p>}

            {!loading && questions.length > 0 ? (
                <div className="space-y-6">
                    {questions.map((question, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">{index + 1}. {question.question}</h2>
                            {question.options.map((option, i) => (
                                <div key={i} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        id={`option-${index}-${i}`}
                                        name={`question-${index}`}
                                        value={option}
                                        onChange={() => handleAnswerChange(index, option)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`option-${index}-${i}`} className="text-gray-700">{option}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button
                        onClick={calculateScore}
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Submit Quiz
                    </button>
                </div>
            ) : (
                !loading && <p className="text-center text-gray-600">No quiz available or something went wrong. Please try again.</p>
            )}

            {score !== null && (
                <div className="mt-6 text-center">
                    <h2 className="text-2xl font-bold text-green-600">Your Score: {score}/{questions.length}</h2>
                </div>
            )}
        </div>
    );
};

export default Quiz;
