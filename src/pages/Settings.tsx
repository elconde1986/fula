import { useNavigate } from 'react-router-dom';
import { useFulaStore } from '../store';
import { personas } from '../data/personas';

export default function Settings() {
  const navigate = useNavigate();
  const { personaId, setPersona } = useFulaStore();
  const currentPersona = personas.find((p) => p.id === personaId);

  if (!personaId || !currentPersona) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="text-center py-12 text-gray-900">
          <p className="text-xl font-semibold mb-4">No Persona Selected</p>
          <p className="text-gray-600 mb-6">Please select a persona to view settings, or choose one below:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setPersona(p.id as any);
                  navigate('/settings');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const profile = currentPersona.profile;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Sample Profile: {currentPersona.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Basic Info</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Age: {profile.age}</li>
              <li>Pre-tax Income: ${profile.pretaxIncome.toLocaleString()}/year</li>
              <li>Net Worth: ${profile.netWorth.toLocaleString()}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Accounts</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Checking: ${profile.checking.toLocaleString()}</li>
              <li>Savings: ${profile.savings.toLocaleString()}</li>
              <li>Brokerage: ${profile.brokerage.toLocaleString()}</li>
              <li>Retirement: ${profile.retirement.toLocaleString()}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Obligations</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Monthly Burn: ${profile.monthlyBurn.toLocaleString()}</li>
              <li>Mortgage PITI: ${profile.mortgagePITI.toLocaleString()}</li>
              <li>Credit Card Mins: ${profile.creditCardMins.toLocaleString()}</li>
              <li>Other Debt: ${profile.otherDebt.toLocaleString()}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Liquid Assets: ${(profile.checking + profile.savings).toLocaleString()}</li>
              <li>Total Debt: ${(profile.mortgagePITI * 12 + profile.creditCardMins * 12 + profile.otherDebt * 12).toLocaleString()}/year</li>
              <li>Debt-to-Income: {((profile.mortgagePITI * 12 + profile.creditCardMins * 12 + profile.otherDebt * 12) / profile.pretaxIncome * 100).toFixed(1)}%</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          This is sample data for demonstration purposes only.
        </p>
      </div>
    </div>
  );
}
