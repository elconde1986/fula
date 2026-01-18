import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFulaStore } from '../store';

const GOALS = [
  'Financial Freedom (time independence)',
  'Buy Investment Property',
  'Reduce Stress / Increase Buffer',
  'Retire Early',
  'Pay Off Debt',
  'Increase Income',
  'Fund Kids / Family',
  'Start Business',
];

export default function Goals() {
  const navigate = useNavigate();
  const { tone, setGoals } = useFulaStore();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [step, setStep] = useState<1 | 2>(1);

  const handleGoalToggle = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else if (selectedGoals.length < 3) {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const hasConflict = selectedGoals.includes('Buy Investment Property') && 
    selectedGoals.includes('Financial Freedom (time independence)');

  const handleContinue = () => {
    if (selectedGoals.length > 0 && step === 1) {
      setStep(2);
    } else {
      setGoals(selectedGoals);
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        {step === 1 ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Goal Setting
            </h1>
            
            {tone === 'friendly' ? (
              <p className="text-gray-700 mb-4">
                Let's start with what you are actually trying to achieve. Not what sounds impressive. What matters to you.
              </p>
            ) : (
              <p className="text-gray-700 mb-4">
                State your goals. Then we will stress-test whether your plan supports them.
              </p>
            )}

            {tone === 'friendly' ? (
              <p className="text-gray-700 mb-6">
                Pick up to 3 goals. You can choose more later, but focus creates freedom.
              </p>
            ) : (
              <p className="text-gray-700 mb-6">
                Pick 3. More than that is self-deception.
              </p>
            )}

            <div className="space-y-3 mb-6">
              {GOALS.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  disabled={!selectedGoals.includes(goal) && selectedGoals.length >= 3}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                    selectedGoals.includes(goal)
                      ? 'border-blue-600 bg-blue-50 text-gray-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                  } ${!selectedGoals.includes(goal) && selectedGoals.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {goal}
                </button>
              ))}
            </div>

            {selectedGoals.includes('Financial Freedom (time independence)') && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                {tone === 'friendly' ? (
                  <p className="text-sm text-gray-700">
                    Freedom is measured in time, not dollars.
                  </p>
                ) : (
                  <p className="text-sm text-gray-700">
                    Freedom is runway. Everything else is noise.
                  </p>
                )}
              </div>
            )}

            {selectedGoals.includes('Buy Investment Property') && (
              <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                {tone === 'friendly' ? (
                  <p className="text-sm text-gray-700">
                    Real estate can build wealth. It can also quietly reduce flexibility. We'll treat it carefully.
                  </p>
                ) : (
                  <p className="text-sm text-gray-700">
                    Real estate often converts liquid safety into illiquid stress. We will treat it skeptically.
                  </p>
                )}
              </div>
            )}

            {hasConflict && (
              <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                {tone === 'friendly' ? (
                  <p className="text-sm text-red-700">
                    These goals conflict. You can pursue both, but it increases fragility. I'll show you what must be true.
                  </p>
                ) : (
                  <p className="text-sm text-red-700">
                    These goals conflict. Pursuing both increases fragility. I'll show you the failure modes.
                  </p>
                )}
              </div>
            )}

            <button
              onClick={handleContinue}
              disabled={selectedGoals.length === 0}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Plan Summary</h2>
            
            {tone === 'friendly' ? (
              <p className="text-gray-700 mb-6">
                This plan optimizes for survival first. Growth comes only if survival is protected.
              </p>
            ) : (
              <p className="text-gray-700 mb-6">
                Survival first. Growth only if survival is guaranteed.
              </p>
            )}

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Selected Goals:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {selectedGoals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleContinue}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Start Session
            </button>
          </>
        )}
      </div>
    </div>
  );
}
