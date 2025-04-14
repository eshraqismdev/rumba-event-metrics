
import React from 'react';
import { CircleDollarSign, Coins, BarChart2, Calendar, TrendingUp, ArrowUpRight } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { GoalProgress } from '@/components/dashboard/GoalProgress';
import { EventsTable } from '@/components/dashboard/EventsTable';
import { TasksList } from '@/components/dashboard/TasksList';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ActionButtons } from '@/components/dashboard/ActionButtons';

const Dashboard = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <ActionButtons />
      </div>
      
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="167,500 AED" 
          trend={12} 
          icon={<CircleDollarSign size={24} />} 
        />
        <StatCard 
          title="Total Expenses" 
          value="86,320 AED" 
          trend={-8} 
          icon={<Coins size={24} />}
        />
        <StatCard 
          title="Net Profit" 
          value="81,180 AED" 
          trend={18} 
          icon={<BarChart2 size={24} />}
        />
        <StatCard 
          title="ROI" 
          value="94%" 
          trend={5} 
          icon={<ArrowUpRight size={24} />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Events Run" 
          value="24" 
          icon={<Calendar size={24} />}
        />
        <StatCard 
          title="Avg. Revenue per Event" 
          value="6,979 AED" 
          trend={4} 
          icon={<CircleDollarSign size={24} />}
        />
        <StatCard 
          title="Avg. Profit per Event" 
          value="3,382 AED" 
          trend={7} 
          icon={<TrendingUp size={24} />}
        />
        <StatCard 
          title="Avg. Expenses per Event" 
          value="3,597 AED" 
          trend={-3} 
          icon={<Coins size={24} />}
        />
      </div>
      
      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <GoalProgress 
            title="This Month's Revenue Goal" 
            target={12000} 
            achieved={7800}
          />
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EventsTable />
        <TasksList />
      </div>
    </div>
  );
};

export default Dashboard;
