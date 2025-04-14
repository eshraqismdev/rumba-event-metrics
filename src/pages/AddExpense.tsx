
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, Coins, Receipt, Users, BadgeDollarSign, MessageSquare, MessageCircle } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock events data - in a real app this would come from API/database
const mockEvents = [
  { id: '1', name: 'Friday Night Rumba (April 12)' },
  { id: '2', name: 'Saturday Exclusive (April 13)' },
  { id: '3', name: 'Friday Night Rumba (April 19)' },
  { id: '4', name: 'Saturday Exclusive (April 20)' },
];

// Define type for dynamic form fields
interface Promoter {
  name: string;
  girlsCount: string;
  payment: string;
}

interface StaffMember {
  role: string;
  name: string;
  payment: string;
}

interface TableCommission {
  promoterName: string;
  amount: string;
}

interface AdCampaign {
  platform: string;
  amount: string;
  reach: string;
  clicks: string;
  leads: string;
}

const formSchema = z.object({
  eventId: z.string(),
  date: z.string(),
  totalAttendees: z.string(),
  netRevenue: z.string().transform((val) => (val === "" ? "0" : val)),
  grossCommission: z.string().transform((val) => (val === "" ? "0" : val)),
  netCommission: z.string().transform((val) => (val === "" ? "0" : val)),
  notes: z.string().optional(),
});

const AddExpense = () => {
  const navigate = useNavigate();
  
  const [promoters, setPromoters] = useState<Promoter[]>([{ name: '', girlsCount: '', payment: '' }]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [tableCommissions, setTableCommissions] = useState<TableCommission[]>([]);
  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventId: "",
      date: new Date().toISOString().split('T')[0],
      totalAttendees: "",
      netRevenue: "",
      grossCommission: "",
      netCommission: "",
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({
      ...values,
      promoters,
      staff,
      tableCommissions,
      adCampaigns
    });
    
    // In a real app, this would save to a database
    toast.success("Expense data added successfully!");
    setTimeout(() => navigate("/"), 1500);
  };

  // Add/remove handlers for dynamic form fields
  const addPromoter = () => {
    setPromoters([...promoters, { name: '', girlsCount: '', payment: '' }]);
  };

  const removePromoter = (index: number) => {
    const updatedPromoters = [...promoters];
    updatedPromoters.splice(index, 1);
    setPromoters(updatedPromoters);
  };

  const addStaffMember = () => {
    setStaff([...staff, { role: '', name: '', payment: '' }]);
  };

  const removeStaffMember = (index: number) => {
    const updatedStaff = [...staff];
    updatedStaff.splice(index, 1);
    setStaff(updatedStaff);
  };

  const addTableCommission = () => {
    setTableCommissions([...tableCommissions, { promoterName: '', amount: '' }]);
  };

  const removeTableCommission = (index: number) => {
    const updatedTableCommissions = [...tableCommissions];
    updatedTableCommissions.splice(index, 1);
    setTableCommissions(updatedTableCommissions);
  };

  const addAdCampaign = () => {
    setAdCampaigns([...adCampaigns, { platform: '', amount: '', reach: '', clicks: '', leads: '' }]);
  };

  const removeAdCampaign = (index: number) => {
    const updatedAdCampaigns = [...adCampaigns];
    updatedAdCampaigns.splice(index, 1);
    setAdCampaigns(updatedAdCampaigns);
  };

  const handlePromoterChange = (index: number, field: keyof Promoter, value: string) => {
    const updatedPromoters = [...promoters];
    updatedPromoters[index][field] = value;
    setPromoters(updatedPromoters);
  };

  const handleStaffChange = (index: number, field: keyof StaffMember, value: string) => {
    const updatedStaff = [...staff];
    updatedStaff[index][field] = value;
    setStaff(updatedStaff);
  };

  const handleTableCommissionChange = (index: number, field: keyof TableCommission, value: string) => {
    const updatedTableCommissions = [...tableCommissions];
    updatedTableCommissions[index][field] = value;
    setTableCommissions(updatedTableCommissions);
  };

  const handleAdCampaignChange = (index: number, field: keyof AdCampaign, value: string) => {
    const updatedAdCampaigns = [...adCampaigns];
    updatedAdCampaigns[index][field] = value;
    setAdCampaigns(updatedAdCampaigns);
  };

  const selectedEventId = form.watch("eventId");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Add Event Expense</h1>
        <p className="text-muted-foreground">Record expense data for an event</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Event Selection Card */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Select an event and enter basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
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

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="totalAttendees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Attendees</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="Number of attendees" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="netRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Net Revenue (AED)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grossCommission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gross Commission (AED)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="netCommission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Net Commission (AED)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Promoters Expenses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Promoters Expenses</CardTitle>
                <CardDescription>Add information about promoter costs</CardDescription>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addPromoter}
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add Promoter
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {promoters.map((promoter, index) => (
                <div key={`promoter-${index}`} className="grid gap-3 sm:grid-cols-7 items-center">
                  <div className="sm:col-span-2">
                    <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                      {index === 0 ? 'Promoter Name' : ''}
                    </FormLabel>
                    <Input 
                      placeholder="Promoter name"
                      value={promoter.name}
                      onChange={(e) => handlePromoterChange(index, 'name', e.target.value)}
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                      {index === 0 ? 'Number of Girls' : ''}
                    </FormLabel>
                    <Input 
                      type="number"
                      min="0"
                      placeholder="Number of girls"
                      value={promoter.girlsCount}
                      onChange={(e) => handlePromoterChange(index, 'girlsCount', e.target.value)}
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                      {index === 0 ? 'Payment (AED)' : ''}
                    </FormLabel>
                    <Input 
                      type="number"
                      min="0"
                      placeholder="Payment amount"
                      value={promoter.payment}
                      onChange={(e) => handlePromoterChange(index, 'payment', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end mt-2 sm:mt-0">
                    {index > 0 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removePromoter(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Staff Expenses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Staff</CardTitle>
                <CardDescription>Add information about staff costs</CardDescription>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addStaffMember}
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add Staff Member
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {staff.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No staff members added yet</p>
              ) : (
                staff.map((member, index) => (
                  <div key={`staff-${index}`} className="grid gap-3 sm:grid-cols-7 items-center">
                    <div className="sm:col-span-2">
                      <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                        {index === 0 ? 'Role' : ''}
                      </FormLabel>
                      <Input 
                        placeholder="Role (e.g., Hostess)"
                        value={member.role}
                        onChange={(e) => handleStaffChange(index, 'role', e.target.value)}
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                        {index === 0 ? 'Name' : ''}
                      </FormLabel>
                      <Input 
                        placeholder="Staff name"
                        value={member.name}
                        onChange={(e) => handleStaffChange(index, 'name', e.target.value)}
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                        {index === 0 ? 'Payment (AED)' : ''}
                      </FormLabel>
                      <Input 
                        type="number"
                        min="0"
                        placeholder="Payment amount"
                        value={member.payment}
                        onChange={(e) => handleStaffChange(index, 'payment', e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-end mt-2 sm:mt-0">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeStaffMember(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Table Commissions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Table Commissions</CardTitle>
                <CardDescription>Add information about table commission expenses</CardDescription>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addTableCommission}
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add Commission
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {tableCommissions.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No table commissions added yet</p>
              ) : (
                tableCommissions.map((commission, index) => (
                  <div key={`commission-${index}`} className="grid gap-3 sm:grid-cols-5 items-center">
                    <div className="sm:col-span-2">
                      <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                        {index === 0 ? 'Promoter Name' : ''}
                      </FormLabel>
                      <Input 
                        placeholder="Promoter name"
                        value={commission.promoterName}
                        onChange={(e) => handleTableCommissionChange(index, 'promoterName', e.target.value)}
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                        {index === 0 ? 'Amount (AED)' : ''}
                      </FormLabel>
                      <Input 
                        type="number"
                        min="0"
                        placeholder="Commission amount"
                        value={commission.amount}
                        onChange={(e) => handleTableCommissionChange(index, 'amount', e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-end mt-2 sm:mt-0">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeTableCommission(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Ad Campaigns */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Ad Spend</CardTitle>
                <CardDescription>Add information about advertising expenses</CardDescription>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addAdCampaign}
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add Campaign
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {adCampaigns.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No ad campaigns added yet</p>
              ) : (
                adCampaigns.map((campaign, index) => (
                  <div key={`ad-${index}`} className="space-y-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="grid gap-3 sm:grid-cols-6 items-center">
                      <div className="sm:col-span-3">
                        <FormLabel>Platform</FormLabel>
                        <Input 
                          placeholder="Platform (e.g., Instagram, Facebook)"
                          value={campaign.platform}
                          onChange={(e) => handleAdCampaignChange(index, 'platform', e.target.value)}
                        />
                      </div>
                      
                      <div className="sm:col-span-2">
                        <FormLabel>Amount (AED)</FormLabel>
                        <Input 
                          type="number"
                          min="0"
                          placeholder="Spend amount"
                          value={campaign.amount}
                          onChange={(e) => handleAdCampaignChange(index, 'amount', e.target.value)}
                        />
                      </div>
                      
                      <div className="flex items-end justify-end h-full">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeAdCampaign(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <FormLabel>Reach</FormLabel>
                        <Input 
                          type="number"
                          min="0"
                          placeholder="Total reach"
                          value={campaign.reach}
                          onChange={(e) => handleAdCampaignChange(index, 'reach', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <FormLabel>Clicks</FormLabel>
                        <Input 
                          type="number"
                          min="0"
                          placeholder="Total clicks"
                          value={campaign.clicks}
                          onChange={(e) => handleAdCampaignChange(index, 'clicks', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <FormLabel>Leads</FormLabel>
                        <Input 
                          type="number"
                          min="0"
                          placeholder="Total leads"
                          value={campaign.leads}
                          onChange={(e) => handleAdCampaignChange(index, 'leads', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Add any additional notes about this event</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter any additional information here..." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button type="submit">Save Expense Data</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddExpense;
