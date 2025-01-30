import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Meeting } from "@/types/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { format, parse } from "date-fns";

export const MeetingSchedules = ({ userRole = "client" }: { userRole?: string }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { toast } = useToast();
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);
  const [statusFilter, setStatusFilter] = useState<Meeting["status"] | "all">("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");

  useEffect(() => {
    const storedMeetings = JSON.parse(localStorage.getItem("meetings") || "[]");
    const typedMeetings = storedMeetings.map((meeting: any) => ({
      ...meeting,
      status: meeting.status || "Pending", // Ensure default status is "pending"
    }));
    setMeetings(typedMeetings);
    setFilteredMeetings(typedMeetings);
  }, []);

  useEffect(() => {
    let filtered = [...meetings];
    if (statusFilter !== "all") {
      filtered = filtered.filter((meeting) => meeting.status === statusFilter);
    }
    if (monthFilter !== "all") {
      filtered = filtered.filter((meeting) => {
        const meetingDate = parse(meeting.meetingDate, "yyyy-MM-dd", new Date());
        const meetingMonth = format(meetingDate, "MMMM").toLowerCase();
        return meetingMonth === monthFilter.toLowerCase();
      });
    }
    setFilteredMeetings(filtered);
  }, [statusFilter, monthFilter, meetings]);

  const handleStatusChange = (meetingId: number, newStatus: Meeting["status"]) => {
    const updatedMeetings = meetings.map((meeting) => {
      if (meeting.id === meetingId) {
        let toastMessage = "";

        if (userRole === "main_admin" && ["approved", "referred"].includes(newStatus)) {
          toastMessage = newStatus === "Confirmed"
            ? "Meeting has been approved by the MCash Division."
            : "Meeting has been referred to another division.";
        } else if (
          userRole === "second_admin" &&
          ["approved", "reschedule"].includes(newStatus)
        ) {
          toastMessage = newStatus === "Confirmed"
            ? "Meeting has been approved by the MCash Division."
            : "Meeting has been marked for rescheduling.";
        } else {
          return meeting; // Invalid status for the role, do nothing
        }

        toast({
          title: "Status Updated",
          description: toastMessage,
        });

        return { ...meeting, status: newStatus };
      }
      return meeting;
    });

    setMeetings(updatedMeetings);
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings));
  };

  const getStatusOptions = () => {
    if (userRole === "main_admin") {
      return [
        { value: "Confirmed", label: "Confirm" },
        { value: "Endorsed", label: "Refer to Second Admin" },
      ];
    }
    if (userRole === "second_admin") {
      return [
        { value: "Confirmed", label: "Confirm" },
        { value: "Rescheduled", label: "Request Reschedule" },
      ];
    }
    return [];
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const statusOptions = ["Pending", "Confirmed", "Endorsed", "Rescheduled"];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Meeting Schedules</h2>
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as Meeting["status"] | "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Select value={monthFilter} onValueChange={setMonthFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {months.map((month) => (
                <SelectItem key={month} value={month.toLowerCase()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <ScrollArea className="h-[60vh] pr-4">
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
            {filteredMeetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell>{meeting.companyName}</TableCell>
                <TableCell>{meeting.contactPerson}</TableCell>
                <TableCell>{meeting.meetingDate}</TableCell>
                <TableCell>{meeting.meetingTime}</TableCell>
                <TableCell>
                  {userRole === "main_admin" || userRole === "second_admin" ? (
                    <Select
                      defaultValue={meeting.status}
                      onValueChange={(value) =>
                        handleStatusChange(meeting.id, value as Meeting["status"])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue>{meeting.status}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {getStatusOptions().map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge>{meeting.status}</Badge>
                  )}
                </TableCell>
                <TableCell>{meeting.dateSubmitted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
};
