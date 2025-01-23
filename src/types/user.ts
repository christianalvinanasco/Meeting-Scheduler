export type UserRole = "main_admin" | "first_division" | "other_division" | "client";

export interface Meeting {
  id: number;
  companyName: string;
  contactPerson: string;
  contactNumber: string;
  meetingDate: string;
  meetingTime: string;
  clientEmails: string;
  teamEmails: string;
  status: "pending" | "approved" | "rejected" | "referred";
  dateSubmitted: string;
}

export interface User {
  username: string;
  role: UserRole;
}