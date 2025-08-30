import React, { useState, useEffect } from 'react';

const EndPage = () => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Auto-close countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Try to close the window
          window.close();
          // Fallback: redirect to a blank page if window.close() doesn't work
          setTimeout(() => {
            window.location.href = 'about:blank';
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Prevent back navigation
    history.pushState(null, null, location.href);
    const handlePopState = () => {
      history.pushState(null, null, location.href);
    };
    window.addEventListener('popstate', handlePopState);

    // Prevent right-click
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-center animate-fade-in">
        <div className="mb-6">
          <svg 
            className="mx-auto h-16 w-16 text-amber-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-semibold text-amber-700 mb-4">
          Thank you for your time
        </h1>
        <p className="text-gray-600 text-lg">
          Based on your responses, you do not currently qualify for this study. We appreciate your interest. If you have any questions, please contact us at yukizhuyue@outlook.com.
        </p>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            This page will close automatically in <span className="font-semibold">{countdown}</span> seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EndPage;
