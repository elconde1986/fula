import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

interface Props {
  liquidity: number; // 0-100
  solvency: number; // 0-100
  leverage: number; // 0-100 (inverted, lower is better)
  diversification: number; // 0-100
  growth: number; // 0-100
}

export default function FinancialHealthChart({ liquidity, solvency, leverage, diversification, growth }: Props) {
  const data = [
    {
      metric: 'Liquidity',
      score: liquidity,
      fullMark: 100,
    },
    {
      metric: 'Solvency',
      score: solvency,
      fullMark: 100,
    },
    {
      metric: 'Leverage',
      score: leverage, // Already inverted
      fullMark: 100,
    },
    {
      metric: 'Diversification',
      score: diversification,
      fullMark: 100,
    },
    {
      metric: 'Growth',
      score: growth,
      fullMark: 100,
    },
  ];

  const averageScore = Math.round(
    (liquidity + solvency + leverage + diversification + growth) / 5
  );

  const getColor = (score: number) => {
    if (score >= 75) return '#10b981'; // green
    if (score >= 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Financial Health Score</h3>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getColor(averageScore) }}
          />
          <span className="text-sm font-medium text-gray-900">
            {averageScore}/100
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={{ fill: 'rgb(17 24 39)', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: 'rgb(107 114 128)', fontSize: 10 }}
          />
          <Radar
            name="Financial Health"
            dataKey="score"
            stroke={getColor(averageScore)}
            fill={getColor(averageScore)}
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-5 gap-2 text-xs text-center">
        {data.map((item) => (
          <div key={item.metric} className="flex flex-col items-center">
            <div className="font-semibold text-gray-900">{item.score}</div>
            <div className="text-gray-600">{item.metric}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
