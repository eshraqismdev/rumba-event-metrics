
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock event data
const events = [
  {
    id: '1',
    name: 'Friday Night Rumba',
    date: '2025-04-12',
    status: 'completed',
    profit: 3200,
  },
  {
    id: '2',
    name: 'Saturday Exclusive',
    date: '2025-04-13',
    status: 'completed',
    profit: 4750,
  },
  {
    id: '3',
    name: 'Friday Night Rumba',
    date: '2025-04-19',
    status: 'upcoming',
    profit: 0,
  },
  {
    id: '4',
    name: 'Saturday Exclusive',
    date: '2025-04-20',
    status: 'upcoming',
    profit: 0,
  },
];

export function EventsTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Latest Events</h3>
        <Select defaultValue="all">
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="thisWeek">This Week</SelectItem>
            <SelectItem value="lastWeek">Last Week</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Profit (AED)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  {event.status === 'completed' ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
                      Upcoming
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {event.status === 'completed' ? 
                    `${event.profit.toLocaleString()}` : 
                    '—'
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
