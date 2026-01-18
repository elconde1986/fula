interface Props {
  before: number;
  after: number;
  unit?: string;
}

export default function FreedomTimeline({ before, after, unit = 'months' }: Props) {
  const delta = after - before;
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{before}</div>
          <div className="text-xs text-gray-600">Before ({unit})</div>
        </div>
        
        <div className="text-gray-400">→</div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{after}</div>
          <div className="text-xs text-gray-600">After ({unit})</div>
        </div>
      </div>
      
      {delta !== 0 && (
        <div className={`text-center mt-2 text-sm font-semibold ${
          delta > 0 ? 'text-red-600' : 'text-green-600'
        }`}>
          Δ {delta > 0 ? '+' : ''}{delta} {unit}
        </div>
      )}
    </div>
  );
}
