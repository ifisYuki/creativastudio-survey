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
    <div className="slide-in">
      <fieldset>
        <legend className="text-xl font-bold text-gray-800 mb-3 leading-relaxed">
          {question.title}
        </legend>
        {question.subtitle && (
          <p className="text-sm text-gray-600 mb-6 italic bg-gray-50 p-3 rounded-lg border-l-4 border-blue-400">
            {question.subtitle}
          </p>
        )}
        {renderQuestion()}
      </fieldset>
    </div>
  );
};

export default QuestionForm;
