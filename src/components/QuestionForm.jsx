import React from 'react';
import RadioQuestion from './RadioQuestion';
import SelectQuestion from './SelectQuestion';

const QuestionForm = ({ question, onAnswer, currentAnswer }) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'radio':
        return (
          <RadioQuestion
            question={question}
            onAnswer={onAnswer}
            currentAnswer={currentAnswer}
          />
        );
      case 'select':
        return (
          <SelectQuestion
            question={question}
            onAnswer={onAnswer}
            currentAnswer={currentAnswer}
          />
        );
      default:
        return <div>Unsupported question type: {question.type}</div>;
    }
  };

  return (
    <div className="animate-fade-in">
      <fieldset>
        <legend className="text-lg font-semibold text-gray-700 mb-2">
          {question.title}
        </legend>
        {question.subtitle && (
          <p className="text-sm text-gray-500 mb-4">
            {question.subtitle}
          </p>
        )}
        {renderQuestion()}
      </fieldset>
    </div>
  );
};

export default QuestionForm;
