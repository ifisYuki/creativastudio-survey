import React from 'react';
import { useNavigate } from 'react-router-dom';
import { STUDY_CONFIG } from '../config/studyConfig';

const WelcomePage = () => {
  const navigate = useNavigate();
  const welcomeConfig = STUDY_CONFIG.welcomePage;

  const handleContinue = () => {
    navigate('/study');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 fade-in">
      <div className="glass-card p-8 rounded-2xl shadow-modern-lg w-full max-w-3xl">
        {/* Header Section */}
        <header className="mb-8 text-center">
          {welcomeConfig.showLogo && (
            <div className="mb-6">
              {welcomeConfig.logo ? (
                <img 
                  src={welcomeConfig.logo} 
                  alt={welcomeConfig.logoAlt || "Study Logo"} 
                  className="mx-auto transition-transform hover:scale-105"
                  style={{
                    width: welcomeConfig.logoWidth || "200px",
                    height: welcomeConfig.logoHeight || "auto",
                    maxWidth: "100%"
                  }}
                />
              ) : (
                // Placeholder when no logo is set
                <div 
                  className="mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{
                    width: welcomeConfig.logoWidth || "200px",
                    height: "120px",
                    maxWidth: "100%"
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">🖼️</div>
                    <div className="text-sm opacity-90">Your Logo Here</div>
                    <div className="text-xs opacity-75 mt-1">study-logo.png</div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {welcomeConfig.title}
          </h1>
          
          {welcomeConfig.subtitle && (
            <p className="text-xl text-gray-600 mb-6">
              {welcomeConfig.subtitle}
            </p>
          )}
        </header>

        {/* Main Content Section */}
        <main className="mb-8">
          <div className="prose prose-lg mx-auto text-gray-700">
            {welcomeConfig.description && (
              <p className="text-lg leading-relaxed mb-6">
                {welcomeConfig.description}
              </p>
            )}

            {/* Key Points Section */}
            {welcomeConfig.keyPoints && welcomeConfig.keyPoints.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {welcomeConfig.keyPointsTitle || "Important Information:"}
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {welcomeConfig.keyPoints.map((point, index) => (
                    <li key={index} className="text-gray-700">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional Information */}
            {welcomeConfig.additionalInfo && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg slide-in">
                <div className="text-blue-700 font-medium">
                  {welcomeConfig.additionalInfo}
                </div>
              </div>
            )}

            {/* Time Estimate */}
            {welcomeConfig.timeEstimate && (
              <div className="text-center bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-600">
                  <span className="font-medium">Estimated time:</span> {welcomeConfig.timeEstimate}
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer Section */}
        <footer className="text-center">
          <button
            onClick={handleContinue}
            className={`btn-modern px-8 py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 ${
              welcomeConfig.buttonStyle === 'green' 
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                : welcomeConfig.buttonStyle === 'red'
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            {welcomeConfig.buttonText || "Continue to Study"}
          </button>

          {welcomeConfig.footerText && (
            <p className="text-sm text-gray-500 mt-4">
              {welcomeConfig.footerText}
            </p>
          )}
        </footer>
      </div>
    </div>
  );
};

export default WelcomePage;
