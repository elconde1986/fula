interface Props {
  survival: { amount: number; rules: string[] };
  growth: { amount: number; rules: string[] };
}

export default function SurvivalGrowthBuckets({ survival, growth }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
        <h4 className="font-semibold text-gray-900 mb-2">Survival Capital</h4>
        <div className="text-lg font-bold text-gray-900 mb-2">
          ${survival.amount.toLocaleString()}
        </div>
        <div className="text-xs text-gray-700 space-y-1">
          <div className="font-medium">Rules:</div>
          <ul className="list-disc list-inside">
            {survival.rules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
        <h4 className="font-semibold text-gray-900 mb-2">Growth Capital</h4>
        <div className="text-lg font-bold text-gray-900 mb-2">
          ${growth.amount.toLocaleString()}
        </div>
        <div className="text-xs text-gray-700 space-y-1">
          <div className="font-medium">Rules:</div>
          <ul className="list-disc list-inside">
            {growth.rules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
