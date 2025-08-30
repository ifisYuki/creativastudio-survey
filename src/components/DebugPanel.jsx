import React, { useState, useEffect } from 'react';
import { STUDY_CONFIG } from '../config/studyConfig';

const DebugPanel = ({ deviceId, testGroup, currentStep, answers, onReset, onSetStep, onSetGroup }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDeviceInfo, setShowDeviceInfo] = useState(false);
  const [abTestResults, setAbTestResults] = useState(null);
  const [isRunningTest, setIsRunningTest] = useState(false);

  if (!STUDY_CONFIG.debug.enabled) {
    return null;
  }

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleDeviceInfo = () => setShowDeviceInfo(!showDeviceInfo);

  const copyDeviceId = () => {
    navigator.clipboard.writeText(deviceId);
    alert('Device ID copied to clipboard! Add this to deviceExemptions in studyConfig.js');
  };

  const resetStudy = () => {
    if (window.confirm('Reset study progress? This will clear all answers and start over.')) {
      onReset();
    }
  };

  const exportData = () => {
    const data = {
      deviceId,
      testGroup,
      currentStep,
      answers,
      timestamp: new Date().toISOString(),
      config: STUDY_CONFIG
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-data-${deviceId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // A/B Testing Distribution Test Functions
  const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const generateTestDeviceId = () => {
    return 'test_' + Math.random().toString(36).substring(2, 15);
  };

  const simulateABTesting = (deviceId) => {
    const hash = simpleHash(deviceId);
    const normalizedHash = hash % 100;
    return normalizedHash < 50 ? 'A' : 'B';
  };

  const runABDistributionTest = (testCount = 100) => {
    setIsRunningTest(true);
    setAbTestResults(null);
    
    // Use setTimeout to prevent UI blocking
    setTimeout(() => {
      const results = { A: 0, B: 0, total: 0 };
      
      for (let i = 0; i < testCount; i++) {
        const testDeviceId = generateTestDeviceId();
        const assignedGroup = simulateABTesting(testDeviceId);
        results[assignedGroup]++;
        results.total++;
      }
      
      // Calculate analysis
      const analysis = {
        A_percentage: (results.A / results.total) * 100,
        B_percentage: (results.B / results.total) * 100,
        ratio: results.A / results.total,
        deviation: Math.abs((results.A / results.total) - 0.5),
        isBalanced: Math.abs((results.A / results.total) - 0.5) <= 0.05
      };
      
      setAbTestResults({ ...results, analysis });
      setIsRunningTest(false);
    }, 10);
  };

  const quickTest = () => runABDistributionTest(100);
  const comprehensiveTest = () => runABDistributionTest(1000);

  // Make A/B testing functions available globally for console testing
  useEffect(() => {
    window.debugABTesting = {
      quickTest: () => {
        console.log('🧪 Running Quick A/B Test (100 samples)...');
        runABDistributionTest(100);
      },
      comprehensiveTest: () => {
        console.log('🧪 Running Comprehensive A/B Test (1000 samples)...');
        runABDistributionTest(1000);
      },
      customTest: (count) => {
        console.log(`🧪 Running Custom A/B Test (${count} samples)...`);
        runABDistributionTest(count);
      },
      testDistribution: (samples = 100) => {
        console.log(`🧪 Testing A/B Distribution with ${samples} samples...`);
        const results = { A: 0, B: 0, total: 0 };
        
        for (let i = 0; i < samples; i++) {
          const testDeviceId = generateTestDeviceId();
          const assignedGroup = simulateABTesting(testDeviceId);
          results[assignedGroup]++;
          results.total++;
        }
        
        const analysis = {
          A_percentage: (results.A / results.total) * 100,
          B_percentage: (results.B / results.total) * 100,
          ratio: results.A / results.total,
          deviation: Math.abs((results.A / results.total) - 0.5),
          isBalanced: Math.abs((results.A / results.total) - 0.5) <= 0.05
        };
        
        console.log('📊 Test Results:', results);
        console.log('📈 Analysis:', analysis);
        console.log(`🎯 Balanced: ${analysis.isBalanced ? '✅ YES' : '❌ NO'}`);
        console.log(`📏 Deviation: ${(analysis.deviation * 100).toFixed(1)}%`);
        
        return { ...results, analysis };
      }
    };
    
    console.log('🧪 A/B Testing Debug Functions Loaded!');
    console.log('Available functions:');
    console.log('- debugABTesting.quickTest() - Run 100 test assignments');
    console.log('- debugABTesting.comprehensiveTest() - Run 1000 test assignments');
    console.log('- debugABTesting.customTest(count) - Run custom number of tests');
    console.log('- debugABTesting.testDistribution(samples) - Test and log results');
    console.log('\n💡 Run debugABTesting.quickTest() to start testing!');
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Debug Toggle Button */}
      <button
        onClick={toggleVisibility}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-mono shadow-lg"
        title="Toggle Debug Panel"
      >
        🐛 DEBUG
      </button>

      {/* Debug Panel */}
      {isVisible && (
        <div className="absolute bottom-12 right-0 w-96 bg-gray-900 text-white p-4 rounded-lg shadow-2xl border border-gray-700 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Debug Panel</h3>
            <button
              onClick={toggleVisibility}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Device Information */}
          <div className="mb-4 p-3 bg-gray-800 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Device ID:</span>
              <button
                onClick={copyDeviceId}
                className="text-blue-400 hover:text-blue-300 text-xs"
                title="Copy Device ID"
              >
                Copy
              </button>
            </div>
            <code className="text-xs text-gray-300 break-all">{deviceId}</code>
            
            {showDeviceInfo && (
              <div className="mt-2 text-xs text-gray-400">
                <div>Test Group: {testGroup}</div>
                <div>Current Step: {currentStep}</div>
                <div>Answers: {Object.keys(answers).length}</div>
              </div>
            )}
            
            <button
              onClick={toggleDeviceInfo}
              className="text-xs text-blue-400 hover:text-blue-300 mt-1"
            >
              {showDeviceInfo ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {/* A/B Testing Distribution Test */}
          <div className="mb-4 p-3 bg-blue-900 rounded border border-blue-700">
            <h4 className="font-semibold mb-2 text-blue-200">🧪 A/B Distribution Test</h4>
            <div className="space-y-2 mb-3">
              <button
                onClick={quickTest}
                disabled={isRunningTest}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-2 py-1 rounded text-xs"
              >
                {isRunningTest ? '⏳ Running...' : '🚀 Quick Test (100)'}
              </button>
              <button
                onClick={comprehensiveTest}
                disabled={isRunningTest}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-2 py-1 rounded text-xs"
              >
                {isRunningTest ? '⏳ Running...' : '📊 Comprehensive Test (1000)'}
              </button>
            </div>
            
            {/* Test Results */}
            {abTestResults && (
              <div className="bg-gray-800 p-2 rounded text-xs">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="text-center">
                    <div className="text-blue-400 font-bold">Group A</div>
                    <div>{abTestResults.A} ({abTestResults.analysis.A_percentage.toFixed(1)}%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold">Group B</div>
                    <div>{abTestResults.B} ({abTestResults.analysis.B_percentage.toFixed(1)}%)</div>
                  </div>
                </div>
                <div className="text-center text-xs">
                  <div className={`font-bold ${abTestResults.analysis.isBalanced ? 'text-green-400' : 'text-yellow-400'}`}>
                    {abTestResults.analysis.isBalanced ? '✅ Balanced' : '⚠️ Unbalanced'}
                  </div>
                  <div className="text-gray-400">
                    Deviation: {(abTestResults.analysis.deviation * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 mb-4">
            <button
              onClick={resetStudy}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-sm"
            >
              🔄 Reset Study
            </button>
            
            <button
              onClick={exportData}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
            >
              📊 Export Data
            </button>
          </div>

          {/* Step Navigation */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Jump to Step:</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(STUDY_CONFIG.questions).map((step) => (
                <button
                  key={step}
                  onClick={() => onSetStep(step)}
                  className={`px-2 py-1 rounded text-xs ${
                    currentStep === step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>

          {/* Group Assignment */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Force Test Group:</h4>
            <div className="flex gap-2">
              {STUDY_CONFIG.abTesting.groups.map((group) => (
                <button
                  key={group}
                  onClick={() => onSetGroup(group)}
                  className={`px-3 py-1 rounded text-sm ${
                    testGroup === group 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-gray-400 border-t border-gray-700 pt-2">
            <p>💡 Add your Device ID to deviceExemptions in studyConfig.js</p>
            <p>🧪 Use A/B tests to verify distribution is working correctly</p>
            <p>🔒 Set debug.enabled to false in production</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
