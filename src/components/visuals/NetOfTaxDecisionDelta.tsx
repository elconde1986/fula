
interface Props {
  data: {
    beforeTax: {
      action: string;
      impact: string;
    };
    afterTax: {
      action: string;
      impact: string;
    };
    netImpactRange: string;
  };
}

export default function NetOfTaxDecisionDelta({ data }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Net-of-Tax Decision Delta</h3>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="font-semibold text-gray-900 mb-1">Before Tax Consideration</div>
          <div className="text-sm text-gray-700 mb-1">Action: {data.beforeTax.action}</div>
          <div className="text-sm text-gray-700">Impact: {data.beforeTax.impact}</div>
        </div>
        <div className="border-l-4 border-amber-500 pl-4">
          <div className="font-semibold text-gray-900 mb-1">After Tax Consideration</div>
          <div className="text-sm text-gray-700 mb-1">Action: {data.afterTax.action}</div>
          <div className="text-sm text-gray-700">Impact: {data.afterTax.impact}</div>
        </div>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
          <div className="font-semibold text-gray-900 mb-1">Net-of-Tax Impact Range</div>
          <div className="text-lg font-bold text-amber-900">{data.netImpactRange}</div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
        <strong>Note:</strong> Tax impact ranges are illustrative only. Actual tax liability depends on holding period, bracket, and state rules. Consult a CPA.
      </div>
    </div>
  );
}
