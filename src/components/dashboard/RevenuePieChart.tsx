
import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for Revenue vs Expenses
const revenueExpensesData = [
  { name: 'Revenue', value: 167500, color: '#8b5cf6' },
  { name: 'Expenses', value: 86320, color: '#ef4444' },
];

// Mock data for Expense Categories
const expensesData = [
  { name: 'Promoters', value: 28000, color: '#ef4444' },
  { name: 'Staff', value: 18500, color: '#f59e0b' },
  { name: 'Advertising', value: 15200, color: '#3b82f6' },
  { name: 'Venue', value: 12500, color: '#10b981' },
  { name: 'Other', value: 12120, color: '#6366f1' },
];

interface RevenuePieChartProps {
  isExpenses?: boolean;
}

export function RevenuePieChart({ isExpenses = false }: RevenuePieChartProps) {
  const data = isExpenses ? expensesData : revenueExpensesData;
  
  const config = {
    ...Object.fromEntries(
      data.map((item) => [
        item.name,
        {
          label: item.name,
          color: item.color,
        },
      ])
    ),
  };

  return (
    <ChartContainer 
      config={config}
      className="w-full aspect-[4/3] mx-auto"
    >
      <div>
        <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={isExpenses ? 0 : 40}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent formatter={(value: number) => [`${value.toLocaleString()} AED`]} />} />
        </PieChart>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className="text-sm font-medium ml-auto">{((item.value / data.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  );
}
