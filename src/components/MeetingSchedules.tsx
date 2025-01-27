import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Meeting } from "@/types/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";

export const MeetingSchedules = ({ userRole = "client" }: { userRole?: string }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedMeetings = JSON.parse(localStorage.getItem("meetings") || "[]");
    const typedMeetings = storedMeetings.map((meeting: any) => ({
      ...meeting,
      status: meeting.status as Meeting['status']
    }));
    setMeetings(typedMeetings);
  }, []);

  const getStatusColor = (status: Meeting['status']) => {
    switch (status) {
      case "approved":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "referred":
        return "bg-yellow-500 text-white";
      case "pending":
        return "bg-blue-500 text-white";
      case "onboarded":
        return "bg-blue-500 text-white";
      case "active":
        return "bg-green-500 text-white";
      case "systemUser":
        return "bg-purple-500 text-white";
      case "fullyCompliant":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleStatusChange = (meetingId: number, newStatus: Meeting['status']) => {
    const updatedMeetings = meetings.map(meeting => {
      if (meeting.id === meetingId) {
        let finalStatus = newStatus;
        let toastMessage = "";

        // Handle main admin actions
        if (userRole === "main_admin") {
          if (newStatus === "rejected") {
            finalStatus = "referred";
            toastMessage = "Meeting has been referred to the second admin for review.";
          } else if (newStatus === "approved") {
            toastMessage = "Meeting has been approved.";
          }
        }
        // Handle second admin actions
        else if (userRole === "second_admin") {
          if (newStatus === "rejected") {
            toastMessage = "Meeting has been rejected.";
          } else if (newStatus === "approved") {
            toastMessage = "Meeting has been approved.";
          }
        }
        // Handle status updates for approved meetings
        else if (["onboarded", "active", "systemUser", "fullyCompliant"].includes(newStatus)) {
          toastMessage = `Meeting status has been updated to ${newStatus}.`;
        }

        toast({
          title: "Status Updated",
          description: toastMessage,
        });

        return { ...meeting, status: finalStatus };
      }
      return meeting;
    });
    
    setMeetings(updatedMeetings);
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings));
  };

  const getStatusOptions = () => {
    if (userRole === "main_admin") {
      return [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approve" },
        { value: "rejected", label: "Reject & Refer" },
        { value: "onboarded", label: "Onboarded" },
        { value: "active", label: "Active" },
        { value: "systemUser", label: "System User" },
        { value: "fullyCompliant", label: "Fully Compliant" }
      ];
    }
    if (userRole === "second_admin") {
      return [
        { value: "approved", label: "Approve" },
        { value: "rejected", label: "Reject" }
      ];
    }
    return [];
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Meeting Schedules</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Meeting Date</TableHead>
            <TableHead>Meeting Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetings.map((meeting) => (
            <TableRow key={meeting.id}>
              <TableCell>{meeting.companyName}</TableCell>
              <TableCell>{meeting.contactPerson}</TableCell>
              <TableCell>{meeting.meetingDate}</TableCell>
              <TableCell>{meeting.meetingTime}</TableCell>
              <TableCell>
                {(userRole === "main_admin" || userRole === "second_admin") ? (
                  <Select 
                    defaultValue={meeting.status}
                    onValueChange={(value) => handleStatusChange(meeting.id, value as Meeting['status'])}
                  >
                    <SelectTrigger className={getStatusColor(meeting.status)}>
                      <SelectValue>{meeting.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {getStatusOptions().map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className={getStatusColor(meeting.status)}>
                    {meeting.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{meeting.dateSubmitted}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};