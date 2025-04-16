
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

// Form schema definition
const formSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  date: z.string().min(1, "Date is required"),
  totalAttendees: z.string().min(1, "Total attendees is required"),
  netRevenue: z.string().min(1, "Net revenue is required"),
  grossCommission: z.string().min(1, "Gross commission is required"),
  netCommission: z.string().min(1, "Net commission is required"),
  tableCommissions: z.string().optional(),
  vipCommissions: z.string().optional(),
  adSpend: z.string().optional(),
  promoterExpenses: z.string().optional(),
  staffExpenses: z.string().optional(),
  otherExpenses: z.string().optional(),
  venueExpenses: z.string().optional(),
  notes: z.string().optional(),
});

// Dynamic form interface definitions
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
  promoter: string;
  amount: string;
}

interface AdCampaign {
  platform: string;
  amount: string;
  reach: string;
  clicks: string;
  leads: string;
}

const AddData = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  // Dynamic form state
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [tableCommissions, setTableCommissions] = useState<TableCommission[]>([]);
  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>([]);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventId: "",
      date: "",
      totalAttendees: "",
      netRevenue: "",
      grossCommission: "",
      netCommission: "",
      tableCommissions: "",
      vipCommissions: "",
      adSpend: "",
      promoterExpenses: "",
      staffExpenses: "",
      otherExpenses: "",
      venueExpenses: "",
      notes: ""
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({
      formValues: values,
      dynamicData: {
        promoters,
        staff,
        tableCommissions,
        adCampaigns
      }
    });
    
    // In a real app, this would save to a database
    toast.success("Event data added successfully!");
    setTimeout(() => navigate("/"), 1500);
  };

  // Dynamic form handlers
  const addPromoter = () => {
    setPromoters([...promoters, { name: "", girlsCount: "", payment: "" }]);
  };

  const removePromoter = (index: number) => {
    const newPromoters = [...promoters];
    newPromoters.splice(index, 1);
    setPromoters(newPromoters);
  };

  const updatePromoter = (index: number, field: keyof Promoter, value: string) => {
    const newPromoters = [...promoters];
    newPromoters[index][field] = value;
    setPromoters(newPromoters);
  };

  const addStaffMember = () => {
    setStaff([...staff, { role: "", name: "", payment: "" }]);
  };

  const removeStaffMember = (index: number) => {
    const newStaff = [...staff];
    newStaff.splice(index, 1);
    setStaff(newStaff);
  };

  const updateStaffMember = (index: number, field: keyof StaffMember, value: string) => {
    const newStaff = [...staff];
    newStaff[index][field] = value;
    setStaff(newStaff);
  };

  const addTableCommission = () => {
    setTableCommissions([...tableCommissions, { promoter: "", amount: "" }]);
  };

  const removeTableCommission = (index: number) => {
    const newTableCommissions = [...tableCommissions];
    newTableCommissions.splice(index, 1);
    setTableCommissions(newTableCommissions);
  };

  const updateTableCommission = (index: number, field: keyof TableCommission, value: string) => {
    const newTableCommissions = [...tableCommissions];
    newTableCommissions[index][field] = value;
    setTableCommissions(newTableCommissions);
  };

  const addAdCampaign = () => {
    setAdCampaigns([...adCampaigns, { platform: "", amount: "", reach: "", clicks: "", leads: "" }]);
  };

  const removeAdCampaign = (index: number) => {
    const newAdCampaigns = [...adCampaigns];
    newAdCampaigns.splice(index, 1);
    setAdCampaigns(newAdCampaigns);
  };

  const updateAdCampaign = (index: number, field: keyof AdCampaign, value: string) => {
    const newAdCampaigns = [...adCampaigns];
    newAdCampaigns[index][field] = value;
    setAdCampaigns(newAdCampaigns);
  };

  return (
    <div className="space-y-6 w-full max-w-[100vw] px-2 sm:px-4 md:px-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Add Event Data</h1>
        <p className="text-muted-foreground">Enter event data and expenses</p>
      </div>
      
      <Tabs defaultValue="event">
        <TabsList className="grid grid-cols-2 mb-6 w-full max-w-md">
          <TabsTrigger value="event">Event Details</TabsTrigger>
          <TabsTrigger value="expenses">Expenses & Promoters</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent value="event">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Event Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="eventId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event ID</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., EVT-001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => {
                                  setSelectedDate(date);
                                  field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="totalAttendees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Attendees</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., 500" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="netRevenue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Net Revenue (AED)</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., 25000" type="number" {...field} />
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
                            <Input placeholder="E.g., 5000" type="number" {...field} />
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
                            <Input placeholder="E.g., 4500" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any additional information about the event" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="expenses">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Expenses & Promoters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Promoters</h3>
                    {promoters.map((promoter, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end border p-3 rounded-md">
                        <div>
                          <Label htmlFor={`promoter-${index}-name`}>Name</Label>
                          <Input
                            type="text"
                            id={`promoter-${index}-name`}
                            value={promoter.name}
                            onChange={(e) => updatePromoter(index, "name", e.target.value)}
                            placeholder="Promoter Name"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`promoter-${index}-girls`}>Girls Count</Label>
                          <Input
                            type="number"
                            id={`promoter-${index}-girls`}
                            value={promoter.girlsCount}
                            onChange={(e) => updatePromoter(index, "girlsCount", e.target.value)}
                            placeholder="Number of Girls"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`promoter-${index}-payment`}>Payment (AED)</Label>
                          <Input
                            type="number"
                            id={`promoter-${index}-payment`}
                            value={promoter.payment}
                            onChange={(e) => updatePromoter(index, "payment", e.target.value)}
                            placeholder="Payment Amount"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button type="button" variant="destructive" size="sm" onClick={() => removePromoter(index)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="secondary" size="sm" onClick={addPromoter}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Promoter
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Staff Members</h3>
                    {staff.map((staffMember, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end border p-3 rounded-md">
                        <div>
                          <Label htmlFor={`staff-${index}-role`}>Role</Label>
                          <Input
                            type="text"
                            id={`staff-${index}-role`}
                            value={staffMember.role}
                            onChange={(e) => updateStaffMember(index, "role", e.target.value)}
                            placeholder="Staff Role"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`staff-${index}-name`}>Name</Label>
                          <Input
                            type="text"
                            id={`staff-${index}-name`}
                            value={staffMember.name}
                            onChange={(e) => updateStaffMember(index, "name", e.target.value)}
                            placeholder="Staff Name"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`staff-${index}-payment`}>Payment (AED)</Label>
                          <Input
                            type="number"
                            id={`staff-${index}-payment`}
                            value={staffMember.payment}
                            onChange={(e) => updateStaffMember(index, "payment", e.target.value)}
                            placeholder="Payment Amount"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button type="button" variant="destructive" size="sm" onClick={() => removeStaffMember(index)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="secondary" size="sm" onClick={addStaffMember}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Staff Member
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Table Commissions</h3>
                    {tableCommissions.map((commission, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end border p-3 rounded-md">
                        <div>
                          <Label htmlFor={`table-commission-${index}-promoter`}>Promoter</Label>
                          <Input
                            type="text"
                            id={`table-commission-${index}-promoter`}
                            value={commission.promoter}
                            onChange={(e) => updateTableCommission(index, "promoter", e.target.value)}
                            placeholder="Promoter Name"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`table-commission-${index}-amount`}>Amount (AED)</Label>
                          <Input
                            type="number"
                            id={`table-commission-${index}-amount`}
                            value={commission.amount}
                            onChange={(e) => updateTableCommission(index, "amount", e.target.value)}
                            placeholder="Commission Amount"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button type="button" variant="destructive" size="sm" onClick={() => removeTableCommission(index)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="secondary" size="sm" onClick={addTableCommission}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Table Commission
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Ad Campaigns</h3>
                    {adCampaigns.map((campaign, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end border p-3 rounded-md">
                        <div>
                          <Label htmlFor={`ad-campaign-${index}-platform`}>Platform</Label>
                          <Input
                            type="text"
                            id={`ad-campaign-${index}-platform`}
                            value={campaign.platform}
                            onChange={(e) => updateAdCampaign(index, "platform", e.target.value)}
                            placeholder="Platform Name"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`ad-campaign-${index}-amount`}>Amount (AED)</Label>
                          <Input
                            type="number"
                            id={`ad-campaign-${index}-amount`}
                            value={campaign.amount}
                            onChange={(e) => updateAdCampaign(index, "amount", e.target.value)}
                            placeholder="Ad Spend Amount"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`ad-campaign-${index}-reach`}>Reach</Label>
                          <Input
                            type="number"
                            id={`ad-campaign-${index}-reach`}
                            value={campaign.reach}
                            onChange={(e) => updateAdCampaign(index, "reach", e.target.value)}
                            placeholder="Reach"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`ad-campaign-${index}-clicks`}>Clicks</Label>
                          <Input
                            type="number"
                            id={`ad-campaign-${index}-clicks`}
                            value={campaign.clicks}
                            onChange={(e) => updateAdCampaign(index, "clicks", e.target.value)}
                            placeholder="Clicks"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2 sm:col-span-2 lg:col-span-1">
                          <div className="flex-1">
                            <Label htmlFor={`ad-campaign-${index}-leads`}>Leads</Label>
                            <Input
                              type="number"
                              id={`ad-campaign-${index}-leads`}
                              value={campaign.leads}
                              onChange={(e) => updateAdCampaign(index, "leads", e.target.value)}
                              placeholder="Leads"
                            />
                          </div>
                          <Button type="button" variant="destructive" size="sm" className="mt-6" onClick={() => removeAdCampaign(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="secondary" size="sm" onClick={addAdCampaign}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Ad Campaign
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="tableCommissions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Table Commissions (AED)</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., 1500" type="number" {...field} />
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
                            <Input placeholder="E.g., 2000" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="adSpend"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad Spend (AED)</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., 3000" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="promoterExpenses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Promoter Expenses (AED)</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., 1000" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="staffExpenses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Staff Expenses (AED)</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., 2500" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="venueExpenses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Venue Expenses (AED)</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., 7000" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="otherExpenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Expenses (AED)</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., 500" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="flex justify-end mt-6 space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
              <Button type="submit">Save Event Data</Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default AddData;
