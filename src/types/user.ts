export type UserRole = "main_admin" | "first_division" | "other_division" | "client";

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export interface Meeting {
  id: number;
  companyName: string;
  contactPerson: string;
  meetingDate: string;
  meetingTime: string;
  status: "pending" | "approved" | "rejected" | "referred";
  dateSubmitted: string;
  referredTo?: string;
  clientEmails: string;
  teamEmails: string;
}

export interface Notification {
  id: number;
  message: string;
  type: "meeting" | "referral" | "status";
  read: boolean;
  createdAt: string;
  userId: string;
}