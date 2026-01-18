import { useState } from 'react';
import { Brain, ChevronDown, ChevronUp, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import type { AdvisorMessage, Tone } from '../types';

interface Props {
  message: AdvisorMessage;
  tone: Tone;
}

export default function AdvisorMessageCard({ message, tone }: Props) {
  const [showCognition, setShowCognition] = useState(false);

  const severityColors = {
    Low: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Medium: 'bg-amber-100 text-amber-800 border-amber-200',
    High: 'bg-red-100 text-red-800 border-red-200',
  };

  const severityIcons = {
    Low: CheckCircle,
    Medium: AlertTriangle,
    High: AlertCircle,
  };

  const SeverityIcon = message.severity ? severityIcons[message.severity] : null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-gray-900">FULA — ADVISOR</span>
        {message.severity && SeverityIcon && (
          <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${severityColors[message.severity]}`}>
            <SeverityIcon className="w-3 h-3" />
            {message.severity}
          </span>
        )}
      </div>

      <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
        {tone === 'friendly' ? message.content.friendly : message.content.direct}
      </div>

      {message.cognition && (
        <div className="mt-5 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowCognition(!showCognition)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {showCognition ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide How Fula Got Here
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show How Fula Got Here
              </>
            )}
          </button>

          {showCognition && (
            <div className="mt-3 p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 shadow-inner">
              <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-600" />
                How Fula Got Here
              </h4>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-white/60 rounded-md p-3">
                  <span className="font-semibold text-gray-900">Signals observed:</span>
                  <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                    {message.cognition.signalsObserved.map((signal, i) => (
                      <li key={i}>{signal}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/60 rounded-md p-3">
                  <span className="font-semibold text-gray-900">Data used:</span>
                  <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                    {message.cognition.dataUsed.map((data, i) => (
                      <li key={i}>{data}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/60 rounded-md p-3">
                  <span className="font-semibold text-gray-900">Lens applied:</span>
                  <span className="ml-2">{message.cognition.lensApplied}</span>
                </div>

                <div className="bg-white/60 rounded-md p-3 border-l-4 border-blue-500">
                  <span className="font-semibold text-gray-900">Conclusion:</span>
                  <span className="ml-2">{message.cognition.conclusion}</span>
                </div>

                <div className="bg-white/60 rounded-md p-3">
                  <span className="font-semibold text-gray-900">Confidence & caveats:</span>
                  <span className="ml-2">{message.cognition.confidenceCaveats}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {message.followUpButtons && message.followUpButtons.length > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">Ask Follow-ups:</p>
          <div className="flex flex-wrap gap-2">
            {message.followUpButtons.map((button, i) => (
              <button
                key={i}
                className="px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 border border-blue-200 transition-all hover:scale-105 shadow-sm"
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
