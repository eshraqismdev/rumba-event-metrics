
import React from 'react';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';

// Mock data
const data = [
  { name: 'Week 1', revenue: 24000, expenses: 15000 },
  { name: 'Week 2', revenue: 36000, expenses: 18000 },
  { name: 'Week 3', revenue: 30000, expenses: 16000 },
  { name: 'Week 4', revenue: 42000, expenses: 20000 },
  { name: 'Week 5', revenue: 35000, expenses: 17500 },
];

export function RevenueChart() {
  return (
    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
      <h3 className="font-medium text-lg mb-6">Revenue vs Expenses</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()} AED`]} 
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.375rem',
                padding: '0.5rem 1rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8b5cf6" 
              fillOpacity={1}
              fill="url(#colorRevenue)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="expenses" 
              stroke="#ef4444" 
              fillOpacity={1}
              fill="url(#colorExpenses)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4 space-x-8">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-rumba-500 rounded-full mr-2"></span>
          <span className="text-sm text-muted-foreground">Revenue</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-danger rounded-full mr-2"></span>
          <span className="text-sm text-muted-foreground">Expenses</span>
        </div>
      </div>
    </div>
  );
}
