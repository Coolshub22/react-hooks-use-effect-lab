import React, { useState, useEffect } from 'react';

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10); // Start with 10 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prev) => {
        if (prev === 1) {
          // If time hits 0, reset timer and trigger onAnswered callback
          onAnswered(false); // False indicates the time is up
          return 10; // Reset to 10 seconds
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup function to clear the timeout when the component is unmounted or re-renders
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]); // Dependencies: run effect whenever timeRemaining or onAnswered changes

  return (
    <div>
      <p>{timeRemaining} seconds remaining</p>
      <p>{question.prompt}</p>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
}

export default Question;