
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, HelpCircle, LogOut, MessageCircle, PlusCircle, Settings as SettingsIcon, User } from 'lucide-react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function Header() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  // Get username from localStorage
  const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : { username: 'Admin' };
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast.success("You've been logged out successfully");
    navigate('/login');
  };
  
  // Notification data
  const notifications = [
    { id: 1, title: 'New Event Added', message: 'Beach Party event was added', time: '5 minutes ago', read: false },
    { id: 2, title: 'Staff Update', message: '2 new staff members added', time: '1 hour ago', read: false },
    { id: 3, title: 'Revenue Report', message: 'Weekly report is ready to view', time: '1 day ago', read: true },
  ];
  
  return (
    <header className="w-full h-16 border-b bg-background flex items-center px-6 sticky top-0 z-10">
      <div className="md:ml-64 w-full flex items-center justify-between">
        <TimeFilter />
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/add-event')} className="hidden sm:flex">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Event
          </Button>
          
          {/* Quick help button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle size={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Need help?</h4>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    size="sm"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> Contact Support
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    size="sm"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" /> View Documentation
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Notifications */}
          <Popover open={showNotifications} onOpenChange={setShowNotifications}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={18} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Notifications</h4>
                  <Button variant="ghost" size="sm">Mark all as read</Button>
                </div>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg space-y-1 ${notification.read ? '' : 'bg-secondary'}`}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{notification.title}</p>
                        {!notification.read && (
                          <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button variant="ghost" size="sm" className="w-full">View All Notifications</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userInfo.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
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
