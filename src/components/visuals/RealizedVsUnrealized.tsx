
interface Props {
  data: {
    unrealized: {
      title: string;
      description: string;
    };
    realized: {
      title: string;
      description: string;
    };
  };
}

export default function RealizedVsUnrealized({ data }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Realized vs Unrealized Gains</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
          <h4 className="font-semibold text-gray-900 mb-2">{data.unrealized.title}</h4>
          <p className="text-sm text-gray-700">{data.unrealized.description}</p>
        </div>
        <div className="border-2 border-amber-200 rounded-lg p-4 bg-amber-50">
          <h4 className="font-semibold text-gray-900 mb-2">{data.realized.title}</h4>
          <p className="text-sm text-gray-700">{data.realized.description}</p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
        <strong>Note:</strong> Fula provides general information, not tax advice. Consult a CPA for your specific situation.
      </div>
    </div>
  );
}
