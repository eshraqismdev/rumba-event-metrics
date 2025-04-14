
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from 'react-router-dom';
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  eventName: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  eventType: z.enum(["weekly", "monthly", "one-time"]),
  dayOfWeek: z.string().optional(),
  eventDate: z.string().optional(),
  venueName: z.string().min(2, {
    message: "Venue name must be at least 2 characters.",
  }),
  dealType: z.enum(["revenue-share", "revenue-share-entrance"]),
  commissions: z.string(),
  isProgressiveCommission: z.boolean().default(false),
  paymentTerms: z.enum(["one-week", "two-weeks", "three-weeks", "one-month"]),
  entranceShare: z.string().optional(),
});

const AddEvent = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      eventType: "one-time",
      venueName: "",
      dealType: "revenue-share",
      commissions: "",
      isProgressiveCommission: false,
      paymentTerms: "one-week",
    },
  });

  const eventType = form.watch("eventType");
  const dealType = form.watch("dealType");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // In a real app, this would save to a database
    toast.success("Event added successfully!");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Add New Event</h1>
        <p className="text-muted-foreground">Fill in the details to create a new event</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Event Details</h2>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Friday Night Rumba" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="one-time">One-Time</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {eventType === "weekly" && (
                <FormField
                  control={form.control}
                  name="dayOfWeek"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day of Week</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                          <SelectItem value="sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {(eventType === "monthly" || eventType === "one-time") && (
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Date</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input type="date" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="venueName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Club XYZ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Deal Type</h2>
            
            <FormField
              control={form.control}
              name="dealType"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Deal Structure</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select deal type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="revenue-share">Revenue Share</SelectItem>
                      <SelectItem value="revenue-share-entrance">Revenue Share & Entrance Deal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="commissions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission Brackets</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="15% on 20,000-40,000 AED, 20% on 40,000+ AED"
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter commission brackets, e.g., "15% on 20,000-40,000 AED" (one per line)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isProgressiveCommission"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is % paid from each bracket? (Progressive Tiers)</FormLabel>
                    <FormDescription>
                      Yes = tiered revenue, No = single tier based on where revenue falls
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="paymentTerms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Terms</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="one-week">One Week</SelectItem>
                      <SelectItem value="two-weeks">Two Weeks</SelectItem>
                      <SelectItem value="three-weeks">Three Weeks</SelectItem>
                      <SelectItem value="one-month">One Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {dealType === "revenue-share-entrance" && (
              <FormField
                control={form.control}
                name="entranceShare"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Entrance Revenue Share (%)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="50%" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter percentage of entrance revenue (e.g., 50%)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button type="submit">Save Event</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEvent;
