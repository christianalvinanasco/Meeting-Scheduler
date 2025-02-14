import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Meeting } from "@/types/user";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash, Forward } from "lucide-react";
import { MeetingDetailsModal } from "./meetingDetails";

export const MeetingSchedules = ({ userRole }: { userRole: "main_admin" | "second_admin" }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { toast } = useToast();
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);
  const [statusFilter, setStatusFilter] = useState<Meeting["status"] | "all">("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedMeetings = JSON.parse(localStorage.getItem("meetings") || "[]");
    const typedMeetings = storedMeetings.map((meeting: any) => ({
      ...meeting,
      status: meeting.status || "Pending",
      payrollStatus: meeting.payrollStatus || "Not Set",
      assignedTo: meeting.assignedTo || "main_admin" // Default to main_admin if not set
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

    // Filter meetings based on user role and assignedTo field
    if (userRole === "main_admin") {
      filtered = filtered.filter((meeting) => 
        meeting.assignedTo === "main_admin" || 
        (meeting.meetingTime !== "8:30 - 10:00" && !meeting.assignedTo)
      );
    } else if (userRole === "second_admin") {
      filtered = filtered.filter((meeting) => 
        meeting.assignedTo === "second_admin" || 
        meeting.meetingTime === "8:30 - 10:00"
      );
    }

    setFilteredMeetings(filtered);
  }, [statusFilter, monthFilter, meetings, userRole]);

  const handleStatusChange = (meetingId: number, newStatus: Meeting["status"]) => {
    const updatedMeetings = meetings.map((meeting) => {
      if (meeting.id === meetingId) {
        let toastMessage = "";
        let updatedMeeting = { ...meeting };

        if (userRole === "main_admin") {
          if (newStatus === "Confirmed") {
            toastMessage = "Meeting has been confirmed by the MCash Division.";
            updatedMeeting.status = "Confirmed";
          } else if (newStatus === "Endorsed") {
            toastMessage = "Meeting has been endorsed to SPBDD.";
            updatedMeeting.status = "Endorsed";
            updatedMeeting.assignedTo = "second_admin";
          }
        } else if (userRole === "second_admin") {
          if (newStatus === "Confirmed") {
            toastMessage = "Meeting has been confirmed by the SPBDD.";
            updatedMeeting.status = "Confirmed";
          } else if (newStatus === "Rescheduled") {
            toastMessage = "Meeting has been marked for rescheduling.";
            updatedMeeting.status = "Rescheduled";
          }
        }

        if (toastMessage) {
          toast({
            title: "Status Updated",
            description: toastMessage,
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
          return updatedMeeting;
        }
      }
      return meeting;
    });

    setMeetings(updatedMeetings);
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings));
  };

  const handleDeleteMeeting = (meetingId: number) => {
    const updatedMeetings = meetings.filter((meeting) => meeting.id !== meetingId);
    setMeetings(updatedMeetings);
    setFilteredMeetings(updatedMeetings);
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings));
    toast({
      title: "Meeting Deleted",
      description: "The meeting has been successfully deleted.",
      style: {
        backgroundColor: "red",
        color: "white",
      },
    });
  };

  const handleForwardMeeting = (meeting: Meeting) => {
    // Add the meeting to the StatusTable data
    const statusTableData = JSON.parse(localStorage.getItem("statusTableData") || "[]");
    const newCompanyData = {
      companyName: meeting.companyName,
      status: "Onboarded", // Default status when forwarded
      dateOnboarded: new Date().toLocaleDateString(),
      dateStarted: meeting.meetingDate,
    };
    localStorage.setItem("statusTableData", JSON.stringify([...statusTableData, newCompanyData]));

    // Update the meeting to be assigned to the second admin
    const updatedMeetings = meetings.map((m) => {
      if (m.id === meeting.id) {
        return { ...m, assignedTo: "second_admin" };
      }
      return m;
    });

    setMeetings(updatedMeetings);
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings));

    toast({
      title: "Meeting Forwarded",
      description: "The meeting has been forwarded to the track referral status.",
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Define available status options based on the user role
  const statusOptions = userRole === "main_admin"
    ? ["Confirmed", "Endorsed"]
    : ["Confirmed", "Reschedule"];

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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMeetings.map((meeting) => (
              <TableRow key={meeting.id} onClick={() => {
                setSelectedMeeting(meeting);
                setIsModalOpen(true);
              }} className="cursor-pointer">
                <TableCell>{meeting.companyName}</TableCell>
                <TableCell>{meeting.contactPerson}</TableCell>
                <TableCell>{meeting.meetingDate}</TableCell>
                <TableCell>{meeting.meetingTime}</TableCell>
                <TableCell>
                  <select
                    value={meeting.status || "Pending"}
                    onChange={(e) => handleStatusChange(meeting.id, e.target.value as Meeting["status"])}
                    onClick={(e) => e.stopPropagation()} // Stop event propagation here
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
                <TableCell>{meeting.dateSubmitted}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMeeting(meeting.id);
                    }}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleForwardMeeting(meeting);
                    }}
                  >
                    <Forward className="h-4 w-4 text-blue-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <MeetingDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meeting={selectedMeeting}
      />
    </Card>
  );
};