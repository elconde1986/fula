interface Assumption {
  assumption: string;
  why: string;
  ifFails: string;
}

interface Props {
  assumptions: Assumption[];
}

export default function AssumptionTable({ assumptions }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b border-gray-200">Assumption</th>
            <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b border-gray-200">Why It Matters</th>
            <th className="px-3 py-2 text-left font-semibold text-gray-900 border-b border-gray-200">If It Fails</th>
          </tr>
        </thead>
        <tbody>
          {assumptions.map((assumption, i) => (
            <tr key={i} className="border-b border-gray-200 last:border-0">
              <td className="px-3 py-2 text-gray-700">{assumption.assumption}</td>
              <td className="px-3 py-2 text-gray-700">{assumption.why}</td>
              <td className="px-3 py-2 text-red-700">{assumption.ifFails}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
