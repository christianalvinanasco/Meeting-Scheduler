import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Meeting } from "@/types/user";

export const MeetingSchedules = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const storedMeetings = JSON.parse(localStorage.getItem("meetings") || "[]");
    setMeetings(storedMeetings);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-status-approved text-white";
      case "rejected":
        return "bg-status-rejected text-white";
      case "pending":
      case "referred":
        return "bg-status-pending text-white";
      default:
        return "bg-gray-500 text-white";
    }
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
                <Badge className={getStatusColor(meeting.status)}>
                  {meeting.status}
                </Badge>
              </TableCell>
              <TableCell>{meeting.dateSubmitted}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};