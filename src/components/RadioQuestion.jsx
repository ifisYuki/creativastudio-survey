import React from 'react';

const RadioQuestion = ({ question, onAnswer, currentAnswer }) => {
  const handleChange = (value) => {
    onAnswer(question.id, value);
  };

  return (
    <div className="space-y-3">
      {question.options.map((option) => (
        <label
          key={option.value}
          className={`radio-option ${
            currentAnswer === option.value ? 'checked' : ''
          }`}
        >
          <input
            type="radio"
            name={question.id}
            value={option.value}
            checked={currentAnswer === option.value}
            onChange={() => handleChange(option.value)}
            className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            required={question.required}
          />
          <span className="ml-3 text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioQuestion;
