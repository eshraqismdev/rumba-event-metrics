
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, CreditCard, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ActionButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild size="sm" className="bg-primary/90 hover:bg-primary">
        <Link to="/add-event">
          <Plus className="mr-1 h-4 w-4" />
          Add Event
        </Link>
      </Button>
      
      <Button asChild size="sm" className="bg-primary/90 hover:bg-primary">
        <Link to="/add-data">
          <FileText className="mr-1 h-4 w-4" />
          Add Data
        </Link>
      </Button>
      
      <Button size="sm" variant="outline">
        <CreditCard className="mr-1 h-4 w-4" />
        Add Expense
      </Button>
      
      <Button size="sm" variant="outline">
        <FileDown className="mr-1 h-4 w-4" />
        Export Report
      </Button>
    </div>
  );
}
