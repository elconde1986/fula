
interface Props {
  data: {
    dividendHeavy: boolean;
    interestHeavy: boolean;
    dragLevel: 'Low' | 'Medium' | 'High';
  };
}

export default function TaxDragIndicators({ data }: Props) {
  const dragColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-amber-100 text-amber-800',
    High: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Drag Indicators</h3>
      <div className="space-y-3">
        <div className={`p-4 rounded-lg border-2 ${dragColors[data.dragLevel]}`}>
          <div className="font-semibold mb-2">Tax Drag Level: {data.dragLevel}</div>
          <div className="text-sm">
            {data.dividendHeavy && <div>• Dividend-heavy assets in taxable accounts create ongoing tax drag</div>}
            {data.interestHeavy && <div>• Interest-bearing assets in taxable accounts are taxed at ordinary rates</div>}
          </div>
        </div>
        <div className="text-sm text-gray-700">
          <div>Dividend-heavy in taxable: {data.dividendHeavy ? 'Yes' : 'No'}</div>
          <div>Interest-heavy in taxable: {data.interestHeavy ? 'Yes' : 'No'}</div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
        <strong>Note:</strong> Consider location-aware allocation (conceptual). Rebalance in tax-advantaged accounts first.
      </div>
    </div>
  );
}
