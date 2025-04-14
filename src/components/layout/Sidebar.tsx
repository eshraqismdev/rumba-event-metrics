
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart2, Calendar, Home, PlusCircle, Settings, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-sidebar text-sidebar-foreground fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-tight">Rumba</h2>
        <p className="text-sm text-sidebar-foreground/70">Event Metrics</p>
      </div>
      <nav className="space-y-1 px-3 py-2 flex-1">
        <NavItem to="/" icon={<Home size={18} />}>Dashboard</NavItem>
        <NavItem to="/events" icon={<Calendar size={18} />}>Events</NavItem>
        <NavItem to="/reports" icon={<BarChart2 size={18} />}>Reports</NavItem>
        <NavItem to="/analytics" icon={<TrendingUp size={18} />}>Analytics</NavItem>
        <NavItem to="/settings" icon={<Settings size={18} />}>Settings</NavItem>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <Button className="w-full" size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function NavItem({ to, icon, children }: NavItemProps) {
  // We would use a hook to determine if the current path matches the link's path
  const isActive = window.location.pathname === to;
  
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
