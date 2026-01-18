import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  monthlyIncome: number;
  monthlyExpenses: number;
  breakdown?: {
    mortgage: number;
    creditCards: number;
    otherDebt: number;
    living: number;
  };
}

export default function IncomeExpenseChart({ monthlyIncome, monthlyExpenses, breakdown }: Props) {
  const textColor = 'rgb(17 24 39)'; // gray-900
  const gridColor = 'rgb(229 231 235)'; // gray-200

  const mainData = [
    {
      category: 'Income',
      amount: monthlyIncome,
    },
    {
      category: 'Expenses',
      amount: monthlyExpenses,
    },
  ];

  const detailData = breakdown ? [
    {
      category: 'Mortgage',
      amount: breakdown.mortgage,
    },
    {
      category: 'Credit Cards',
      amount: breakdown.creditCards,
    },
    {
      category: 'Other Debt',
      amount: breakdown.otherDebt,
    },
    {
      category: 'Living Costs',
      amount: breakdown.living,
    },
  ] : [];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mainData}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="category" 
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
          <Bar dataKey="amount" fill="#3b82f6" name="Monthly Amount" />
        </BarChart>
      </ResponsiveContainer>
      {detailData.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Expense Breakdown</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={detailData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="category" 
                tick={{ fill: textColor, fontSize: 10 }}
                stroke={textColor}
              />
              <YAxis 
                tick={{ fill: textColor, fontSize: 10 }}
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
              <Bar dataKey="amount" fill="#ef4444" name="Monthly Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
