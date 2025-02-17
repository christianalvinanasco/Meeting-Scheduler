import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";


const timeSlots = [
  "8:30 - 10:00",
  "10:00 - 11:30",
  "13:00 - 14:30",
  "14:30 - 16:00",
  "16:00 - 17:30"
];

const payrollOperationStatuses = [
  "No system; payroll is computed manually and paid in cash",
  "Payroll system in place, but a disbursement channel is needed for cash payroll",
  "No system, but only a disbursement channel is needed for salary payments",
  "Others"
];

export const VirtualDemoForm = ({ onClose, userRole = "client" }: { onClose: () => void; userRole?: string }) => {
  
  if (userRole === "main_admin" || userRole === "second_admin") {
    return null;
  }

  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    contactNumber: "",
    meetingDate: "",
    meetingTime: "",
    clientEmails: "",
    teamEmails: "",
    payrollStatus: "",
    otherPayrollStatus: "",
    status: "Pending"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existingMeetings = JSON.parse(localStorage.getItem("meetings") || "[]");

    const newMeeting = {
      ...formData,
      id: Date.now(),
      dateSubmitted: new Date().toLocaleDateString(),
      status: "Pending",
      payrollStatus: formData.payrollStatus === "Others" ? formData.otherPayrollStatus : formData.payrollStatus,
      assignedTo: formData.meetingTime === "8:30 - 10:00" ? "second_admin" : "main_admin"
    };

    localStorage.setItem("meetings", JSON.stringify([...existingMeetings, newMeeting]));

    toast({
      title: "Success!",
      description: "Thank you! Your request has been submitted. Please wait for confirmation from ML Payroll Business Development.",
      style: {
        backgroundColor: "green", // Light green background
        color: "white", // Dark green text
        border: "red", // Green border
      },
    });

    onClose();
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
  <ScrollArea className="h-[80vh] pr-4">
    <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={handleChange("companyName")}
            required
            className="w-full"
          />
        </div>
        <div>
          <Label>Client Current Status of Payroll Operations</Label>
          <Select 
            onValueChange={(value) => setFormData(prev => ({ ...prev, payrollStatus: value }))}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select client current status" />
            </SelectTrigger>
            <SelectContent>
              {payrollOperationStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {formData.payrollStatus === "Others" && (
          <div>
            <Label htmlFor="otherPayrollStatus">Please specify other status</Label>
            <Input
              id="otherPayrollStatus"
              value={formData.otherPayrollStatus}
              onChange={handleChange("otherPayrollStatus")}
              required
              placeholder="Enter your current payroll status"
              className="w-full"
            />
          </div>
        )}
        <div>
          <Label htmlFor="contactPerson">Client Contact Person</Label>
          <Input
            id="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange("contactPerson")}
            required
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="contactNumber">Client Contact Number</Label>
          <Input
            id="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange("contactNumber")}
            required
            type="tel"
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="meetingDate">Meeting Date</Label>
          <Input
            id="meetingDate"
            type="date"
            value={formData.meetingDate}
            onChange={handleChange("meetingDate")}
            required
            className="w-full"
          />
        </div>
        <div>
          <Label>Meeting Time</Label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, meetingTime: value, timeOption: "1" }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your preferred time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={`opt1-${slot}`} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="clientEmails">Client Team Members' Email Addresses joining the meeting</Label>
          <Textarea
            id="clientEmails"
            value={formData.clientEmails}
            onChange={handleChange("clientEmails")}
            placeholder="Enter email addresses separated by commas"
            required
            className="w-full"
          />
          <span className="text-sm text-red-400">Example: 123@gmail.com, abc@gmail.com, xyz@gmail.com</span>
        </div>
        <div>
          <Label htmlFor="teamEmails">RMs/AMs Team Members' Email Addresses joining the meeting</Label>
          <Textarea
            id="teamEmails"
            value={formData.teamEmails}
            onChange={handleChange("teamEmails")}
            placeholder="Enter email addresses separated by commas"
            required
            className="w-full"
          />
          <span className="text-sm text-red-400">Example: 123@gmail.com, abc@gmail.com, xyz@gmail.com</span>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
          Submit Request
        </Button>
      </div>
    </form>
  </ScrollArea>
);
};
