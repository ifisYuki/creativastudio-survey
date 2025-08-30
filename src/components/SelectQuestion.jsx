import React from 'react';

const SelectQuestion = ({ question, onAnswer, currentAnswer }) => {
  const handleChange = (event) => {
    onAnswer(question.id, event.target.value);
  };

  return (
    <div className="space-y-3">
      <select
        id={question.id}
        name={question.id}
        value={currentAnswer || ''}
        onChange={handleChange}
        className="form-field"
        required={question.required}
      >
        <option value="" disabled>
          Please select an option
        </option>
        {question.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectQuestion;
