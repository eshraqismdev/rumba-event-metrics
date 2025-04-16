
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart2, Calendar, Home, PlusCircle, Settings, TrendingUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export function Sidebar() {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { to: "/", icon: <Home size={18} />, label: "Dashboard" },
    { to: "/add-event", icon: <Calendar size={18} />, label: "Add Event" },
    { to: "/add-data", icon: <FileText size={18} />, label: "Add Data" },
    { to: "/reports", icon: <BarChart2 size={18} />, label: "Reports" },
    { to: "/analytics", icon: <TrendingUp size={18} />, label: "Analytics" },
    { to: "/settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-sidebar text-sidebar-foreground fixed left-0 top-0 z-20">
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-tight">Rumba</h2>
        <p className="text-sm text-sidebar-foreground/70">Event Metrics</p>
      </div>
      <nav className="space-y-1 px-3 py-2 flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem 
            key={item.to}
            to={item.to} 
            icon={item.icon} 
            isActive={location.pathname === item.to}
          >
            {item.label}
          </NavItem>
        ))}
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

export function NavItem({ to, icon, children, isActive }: NavItemProps) {
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
