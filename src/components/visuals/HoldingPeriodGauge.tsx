
interface Props {
  data: {
    holdingPeriod: 'Short-term' | 'Long-term' | 'Mixed';
  };
}

export default function HoldingPeriodGauge({ data }: Props) {
  const isShortTerm = data.holdingPeriod === 'Short-term';
  const isLongTerm = data.holdingPeriod === 'Long-term';
  const isMixed = data.holdingPeriod === 'Mixed';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Holding Period</h3>
      <div className="flex items-center gap-4">
        <div className={`flex-1 h-12 rounded-lg flex items-center justify-center font-medium ${
          isShortTerm || isMixed ? 'bg-red-100 text-red-800 border-2 border-red-300' : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
        }`}>
          Short-term
        </div>
        <div className={`flex-1 h-12 rounded-lg flex items-center justify-center font-medium ${
          isLongTerm || isMixed ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
        }`}>
          Long-term
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-700">
        Current status: <strong>{data.holdingPeriod}</strong>
      </div>
      <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
        <strong>Note:</strong> Short-term gains (held &lt;1 year) are taxed at ordinary income rates. Long-term gains (held ≥1 year) typically at lower capital gains rates.
      </div>
    </div>
  );
}
