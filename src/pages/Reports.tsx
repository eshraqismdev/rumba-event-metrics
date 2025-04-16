
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartPieIcon, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RevenuePieChart } from '@/components/dashboard/RevenuePieChart';

const Reports = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-medium">Financial Summary</h2>
          <p className="text-muted-foreground">Overview of your financial performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Breakdown of revenue and expense distribution</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <RevenuePieChart />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Breakdown of expenses by category</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <RevenuePieChart isExpenses={true} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>Summary of revenue, expenses and profit by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50">
                <tr>
                  <th scope="col" className="px-6 py-3">Month</th>
                  <th scope="col" className="px-6 py-3">Events</th>
                  <th scope="col" className="px-6 py-3">Revenue</th>
                  <th scope="col" className="px-6 py-3">Expenses</th>
                  <th scope="col" className="px-6 py-3">Profit</th>
                  <th scope="col" className="px-6 py-3">ROI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { month: "January", events: 4, revenue: 42000, expenses: 18000, profit: 24000, roi: 133 },
                  { month: "February", events: 4, revenue: 38000, expenses: 17000, profit: 21000, roi: 123 },
                  { month: "March", events: 5, revenue: 52000, expenses: 22000, profit: 30000, roi: 136 },
                  { month: "April", events: 4, revenue: 46000, expenses: 19000, profit: 27000, roi: 142 }
                ].map((row, i) => (
                  <tr key={i} className="border-b">
                    <th scope="row" className="px-6 py-4 font-medium">{row.month}</th>
                    <td className="px-6 py-4">{row.events}</td>
                    <td className="px-6 py-4">{row.revenue.toLocaleString()} AED</td>
                    <td className="px-6 py-4">{row.expenses.toLocaleString()} AED</td>
                    <td className="px-6 py-4 font-medium text-primary">{row.profit.toLocaleString()} AED</td>
                    <td className="px-6 py-4">{row.roi}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
