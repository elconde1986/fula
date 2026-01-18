import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Props {
  runwayMonths: number;
  monthlyBurn: number;
  liquidAssets: number;
  targetRunway?: number;
}

export default function RunwayVisualization({ runwayMonths, monthlyBurn, liquidAssets, targetRunway = 6 }: Props) {
  const months = Math.max(12, Math.ceil(runwayMonths * 1.5));
  const data = [];
  let balance = liquidAssets;

  for (let i = 0; i <= months; i++) {
    if (i > 0) {
      balance -= monthlyBurn;
    }
    data.push({
      month: i,
      balance: Math.max(0, Math.round(balance)),
      status: balance > 0 ? 'positive' : 'negative',
    });
  }

  const textColor = 'rgb(17 24 39)'; // gray-900
  const gridColor = 'rgb(229 231 235)'; // gray-200

  const getStatusColor = () => {
    if (runwayMonths < targetRunway) return '#ef4444'; // red
    if (runwayMonths < targetRunway * 2) return '#f59e0b'; // amber
    return '#10b981'; // green
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Runway Analysis</h3>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getStatusColor() }}
          />
          <span className="text-sm font-medium text-gray-900">
            {runwayMonths.toFixed(1)} months
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="month" 
            tick={{ fill: textColor, fontSize: 12 }}
            stroke={textColor}
            label={{ value: 'Months', position: 'insideBottom', offset: -5, style: { fill: textColor } }}
          />
          <YAxis 
            tick={{ fill: textColor, fontSize: 12 }}
            stroke={textColor}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
            formatter={(value: number | undefined) => [
              `$${(value || 0).toLocaleString()}`,
              'Liquid Assets'
            ]}
            labelFormatter={(value) => `Month ${value}`}
          />
          <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
          <Bar dataKey="balance" fill={getStatusColor()} name="Liquid Assets" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-gray-600">Current Runway</div>
          <div className="font-semibold text-gray-900">{runwayMonths.toFixed(1)} months</div>
        </div>
        <div>
          <div className="text-gray-600">Monthly Burn</div>
          <div className="font-semibold text-gray-900">${monthlyBurn.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-600">Target</div>
          <div className="font-semibold text-gray-900">{targetRunway}+ months</div>
        </div>
      </div>
    </div>
  );
}
