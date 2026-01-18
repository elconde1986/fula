interface TimeBucket {
  range: string;
  source: string;
  amount: number;
  friction?: string;
}

interface Props {
  buckets: TimeBucket[];
}

export default function TimeToCashLadder({ buckets }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b border-gray-200">Time Range</th>
            <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b border-gray-200">Source</th>
            <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b border-gray-200">Amount</th>
            <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b border-gray-200">Friction</th>
          </tr>
        </thead>
        <tbody>
          {buckets.map((bucket, i) => (
            <tr key={i} className="border-b border-gray-200 last:border-0">
              <td className="px-3 py-2 text-gray-700 font-medium">{bucket.range}</td>
              <td className="px-3 py-2 text-gray-700">{bucket.source}</td>
              <td className="px-3 py-2 text-gray-700">${bucket.amount.toLocaleString()}</td>
              <td className="px-3 py-2 text-gray-600 text-xs">{bucket.friction || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
