import { useNavigate } from 'react-router-dom';
import { useFulaStore } from '../store';
import { scenarios } from '../data/scenarios';
import { personas } from '../data/personas';

export default function Scenarios() {
  const navigate = useNavigate();
  const { personaId, setPersona, setScenario } = useFulaStore();
  const currentPersonaId = personaId || '1'; // Default to persona 1 if none selected

  const handleStartScenario = (scenarioId: string) => {
    if (!personaId) {
      // If no persona selected, use default persona 1
      setPersona('1' as any);
    }
    setScenario(scenarioId as any);
    navigate(`/session/${currentPersonaId}/${scenarioId}`);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Scenario Library</h1>
      
      {personaId && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            Starting scenarios as: <span className="font-semibold">{personas.find(p => p.id === personaId)?.name || 'Unknown'}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{scenario.name}</h2>
            <p className="text-gray-600 mb-4">{scenario.description}</p>
            <button
              onClick={() => handleStartScenario(scenario.id)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Start Scenario
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors shadow-md hover:shadow-lg"
      >
        Back to Home
      </button>
    </div>
  );
}
