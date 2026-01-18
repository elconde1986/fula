import { useNavigate } from 'react-router-dom';
import { useFulaStore } from '../store';
import { personas } from '../data/personas';
import { ArrowRight, Target, BookOpen, UserCheck, TrendingUp, AlertTriangle, Shield, User } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { setPersona, setScenario, tone } = useFulaStore();

  const handleStartPersona = (personaId: string, scenarioId: string) => {
    setPersona(personaId as any);
    setScenario(scenarioId as any);
    navigate(`/session/${personaId}/${scenarioId}`);
  };

  const handleViewProfile = (e: React.MouseEvent, personaId: string) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    setPersona(personaId as any);
    navigate('/profile');
  };

  const personaIcons = [UserCheck, TrendingUp, Shield, AlertTriangle];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-2xl mb-6 shadow-xl">
          <div className="text-white text-5xl font-bold">FULA</div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Financial Understanding & Liquidity Analysis
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A skeptical fiduciary session: risk committee + behavioral coach + liquidity engineer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {personas.map((persona, index) => {
          const Icon = personaIcons[index] || UserCheck;
          return (
            <div
              key={persona.id}
              className="group border border-gray-200 rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              onClick={() => handleStartPersona(persona.id, persona.defaultScenario)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{persona.name}</h2>
                  <p className="text-sm text-gray-600">
                    {tone === 'friendly' ? persona.descriptionFriendly : persona.descriptionDirect}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => handleViewProfile(e, persona.id)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button 
                  onClick={() => handleStartPersona(persona.id, persona.defaultScenario)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  Start Session
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center space-y-4">
        <button
          onClick={() => navigate('/goals')}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
        >
          <Target className="w-5 h-5" />
          Set Goals
        </button>
        <div>
          <button
            onClick={() => navigate('/scenarios')}
            className="px-8 py-4 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
          >
            <BookOpen className="w-5 h-5" />
            View Scenario Library
          </button>
        </div>
      </div>
    </div>
  );
}
