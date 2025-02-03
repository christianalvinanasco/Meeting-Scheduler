import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Meeting } from "@/types/user";
import { format, parse } from "date-fns";

export const MeetingSchedules = ({ userRole }: { userRole: "main_admin" | "second_admin" }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { toast } = useToast();
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);
  const [statusFilter, setStatusFilter] = useState<Meeting["status"] | "all">("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");

  useEffect(() => {
    const storedMeetings = JSON.parse(localStorage.getItem("meetings") || "[]");
    const typedMeetings = storedMeetings.map((meeting: any) => ({
      ...meeting,
      status: meeting.status || "Pending",
      payrollStatus: meeting.payrollStatus || "Not Set",
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

        if (userRole === "main_admin" && ["Confirm", "Endorse"].includes(newStatus)) {
          toastMessage =
            newStatus === "Confirm"
              ? "Meeting has been confirmed by the MCash Division."
              : "Meeting has been endorsed to the other division.";
        } else if (
          userRole === "second_admin" && ["Confirm", "Reschedule"].includes(newStatus)
        ) {
          toastMessage =
            newStatus === "Confirm"
              ? "Meeting has been confirmed by the SPBDD."
              : "Meeting has been marked for rescheduling.";
        } else {
          return meeting; // Invalid status for the role, do nothing
        }

        toast({
          title: "Status Updated",
          description: toastMessage,
          style: {
            backgroundColor: "green",
            color: "white",
            border: "red",
          },
        });

        return { ...meeting, status: newStatus };
      }
      return meeting;
    });

    setMeetings(updatedMeetings);
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings));
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  
  // Define available status options based on the user role
  const statusOptions = userRole === "main_admin"
    ? ["Confirm", "Endorse"]
    : ["Confirm", "Reschedule"];

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
              <TableHead>Payroll Status</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Actions</TableHead>
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
                  <select
                    value={meeting.status || "Pending"}
                    onChange={(e) => handleStatusChange(meeting.id, e.target.value as Meeting["status"])}
                    className="border border-gray-300 rounded-md p-1"
                  >
                    <option value="Pending">Pending</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell>{meeting.payrollStatus}</TableCell>
                <TableCell>{meeting.dateSubmitted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
};
