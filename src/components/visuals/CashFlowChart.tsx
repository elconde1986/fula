import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  months: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  startingBalance: number;
}

export default function CashFlowChart({ months, monthlyIncome, monthlyExpenses, startingBalance }: Props) {
  const data = [];
  let balance = startingBalance;

  for (let i = 0; i <= months; i++) {
    if (i > 0) {
      balance += monthlyIncome - monthlyExpenses;
    }
    data.push({
      month: i === 0 ? 'Start' : `Month ${i}`,
      balance: Math.round(balance),
      income: monthlyIncome,
      expenses: monthlyExpenses,
    });
  }

  const textColor = 'rgb(17 24 39)'; // gray-900
  const gridColor = 'rgb(229 231 235)'; // gray-200

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Projection</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="month" 
            tick={{ fill: textColor, fontSize: 12 }}
            stroke={textColor}
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
            formatter={(value: any) => `$${Number(value).toLocaleString()}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Balance"
            dot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="income" 
            stroke="#10b981" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Income"
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke="#ef4444" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
