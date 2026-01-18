
interface Props {
  data: {
    sources: Array<{
      label: string;
      taxNote: string;
      risk?: 'Low' | 'Medium' | 'High';
    }>;
  };
}

export default function FundingSourceComparison({ data }: Props) {
  const riskColors = {
    Low: 'bg-green-50 border-green-200',
    Medium: 'bg-amber-50 border-amber-200',
    High: 'bg-red-50 border-red-200',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Source Comparison</h3>
      <div className="space-y-3">
        {data.sources.map((source, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg border-2 ${source.risk ? riskColors[source.risk] : 'bg-gray-50 border-gray-200'}`}
          >
            <div className="font-semibold text-gray-900 mb-1">{source.label}</div>
            <div className="text-sm text-gray-700">{source.taxNote}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
        <strong>Note:</strong> Tax implications are illustrative. Consult a CPA before making funding decisions.
      </div>
    </div>
  );
}
