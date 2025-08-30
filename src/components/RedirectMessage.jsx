import React from 'react';
import { STUDY_CONFIG } from '../config/studyConfig';

const RedirectMessage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-800">
            {STUDY_CONFIG.messages.redirecting}
          </h2>
          <p className="text-gray-600">
            {STUDY_CONFIG.messages.redirectSubtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RedirectMessage;
