import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Meeting } from "@/types/user";

interface MeetingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  meeting: Meeting | null;
}

export const MeetingDetailsModal = ({ isOpen, onClose, meeting }: MeetingDetailsModalProps) => {
  if (!meeting) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto bg-red-500 border shadow-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-white text-center text-3xl">Meeting Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <div className="bg-gray-200 p-2 rounded-lg">
            <label className="font-bold">Company Name:</label>
            <p className="text-black-500 font-sans">{meeting.companyName}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded-lg">
            <label className="font-bold">Current Status of Payroll Operations:</label>
            <p className="text-black-500 text-justify font-sans">{meeting.payrollStatus}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded-lg">
            <label className="font-bold">Contact Person:</label>
            <p className="text-black-500 font-sans">{meeting.contactPerson}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded-lg">
            <label className="font-bold">Contact Number:</label>
            <p className="text-black-500 font-sans">{meeting.contactNumber}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded-lg">
            <label className="font-bold">Meeting Date:</label>
            <p className="text-black-500 font-sans">{meeting.meetingDate}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded-lg">
            <label className="font-bold">Meeting Time:</label>
            <p className="text-black-500 font-sans">{meeting.meetingTime}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded-lg">
            <label className="font-bold">Client Emails joining the meeting:</label>
            <p className="text-black-500 font-sans">{meeting.clientEmails}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded-lg">
            <label className="font-bold">RMs/AMs Emails joining the meeting:</label>
            <p className="text-black-500 font-sans">{meeting.teamEmails}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded-lg">
            <label className="font-bold">Status:</label>
            <p className="text-black-500 font-sans">{meeting.status}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded-lg">
            <label className="font-bold">Date Submitted:</label>
            <p className="text-black-500 font-sans">{meeting.dateSubmitted}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
