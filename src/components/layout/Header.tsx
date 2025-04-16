
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, PlusCircle, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TimeFilter } from '../dashboard/TimeFilter';
import { toast } from 'sonner';

export function Header() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast.success("You've been logged out successfully");
    navigate('/login');
  };
  
  return (
    <header className="w-full h-16 border-b bg-background flex items-center px-6 sticky top-0 z-10">
      <div className="md:ml-64 w-full flex items-center justify-between">
        <TimeFilter />
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/add-event')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Event
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
