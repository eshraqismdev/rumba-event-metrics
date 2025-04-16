
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart2, Calendar, Home, PlusCircle, Settings, TrendingUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-sidebar text-sidebar-foreground fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-tight">Rumba</h2>
        <p className="text-sm text-sidebar-foreground/70">Event Metrics</p>
      </div>
      <nav className="space-y-1 px-3 py-2 flex-1">
        <NavItem to="/" icon={<Home size={18} />} isActive={location.pathname === "/"}>
          Dashboard
        </NavItem>
        <NavItem to="/add-event" icon={<Calendar size={18} />} isActive={location.pathname === "/add-event"}>
          Add Event
        </NavItem>
        <NavItem to="/add-data" icon={<FileText size={18} />} isActive={location.pathname === "/add-data"}>
          Add Data
        </NavItem>
        <NavItem to="/reports" icon={<BarChart2 size={18} />} isActive={location.pathname === "/reports"}>
          Reports
        </NavItem>
        <NavItem to="/analytics" icon={<TrendingUp size={18} />} isActive={location.pathname === "/analytics"}>
          Analytics
        </NavItem>
        <NavItem to="/settings" icon={<Settings size={18} />} isActive={location.pathname === "/settings"}>
          Settings
        </NavItem>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <Button asChild className="w-full" size="sm">
          <Link to="/add-event">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Event
          </Link>
        </Button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}

function NavItem({ to, icon, children, isActive }: NavItemProps) {
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
