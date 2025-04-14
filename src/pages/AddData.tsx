
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  eventId: z.string(),
  date: z.string(),
  promoters: z.string().optional(),
  staff: z.string().optional(),
  tableCommissions: z.string().transform((val) => (val === "" ? "0" : val)),
  vipCommissions: z.string().transform((val) => (val === "" ? "0" : val)),
  adSpend: z.string().transform((val) => (val === "" ? "0" : val)),
  adReach: z.string().optional(),
  adClicks: z.string().optional(),
  adLeads: z.string().optional(),
  websiteLeads: z.string().optional(),
  attendance: z.string().optional(),
  numTables: z.string().transform((val) => (val === "" ? "0" : val)),
  revenue: z.string().transform((val) => (val === "" ? "0" : val)),
  entranceRevenue: z.string().transform((val) => (val === "" ? "0" : val)),
});

// Mock events data - in a real app this would come from API/database
const mockEvents = [
  { id: '1', name: 'Friday Night Rumba (April 12)' },
  { id: '2', name: 'Saturday Exclusive (April 13)' },
  { id: '3', name: 'Friday Night Rumba (April 19)' },
  { id: '4', name: 'Saturday Exclusive (April 20)' },
];

const AddData = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventId: "",
      date: new Date().toISOString().split('T')[0],
      promoters: "",
      staff: "",
      tableCommissions: "",
      vipCommissions: "",
      adSpend: "",
      adReach: "",
      adClicks: "",
      adLeads: "",
      websiteLeads: "",
      attendance: "",
      numTables: "",
      revenue: "",
      entranceRevenue: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // In a real app, this would save to a database
    toast.success("Event data added successfully!");
    setTimeout(() => navigate("/"), 1500);
  };

  const selectedEventId = form.watch("eventId");
  const selectedEvent = mockEvents.find(event => event.id === selectedEventId);
  const isDealWithEntrance = selectedEventId === '1' || selectedEventId === '3'; // Just for demo purposes

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Add Event Data</h1>
        <p className="text-muted-foreground">Record performance data for an event</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Event Selection</h2>
            
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="eventId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Event</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an event" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockEvents.map(event => (
                          <SelectItem key={event.id} value={event.id}>{event.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {selectedEventId && (
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-lg font-medium mb-4">Staff & Expenses</h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="promoters"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promoters</FormLabel>
                      <FormControl>
                        <Input placeholder="Names of promoters" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="staff"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Staff</FormLabel>
                      <FormControl>
                        <Input placeholder="Hostesses, photographers, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tableCommissions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Table Commissions (AED)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="vipCommissions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VIP Commissions (AED)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator className="my-6" />
              
              <h3 className="text-md font-medium mb-4">Advertising</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="adSpend"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Spend (AED)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="adReach"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Reach</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="People reached" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="adClicks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Clicks</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="Click count" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="adLeads"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Leads</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="Lead count" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          
          {selectedEventId && (
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-lg font-medium mb-4">Performance Data</h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="websiteLeads"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website Leads</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="Lead count" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="attendance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attendance</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="Number of attendees" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="numTables"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Tables</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="revenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Revenue (AED)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {isDealWithEntrance && (
                  <FormField
                    control={form.control}
                    name="entranceRevenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entrance Revenue (AED)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          )}
          
          {selectedEventId && (
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button type="submit">Save Data</Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AddData;
