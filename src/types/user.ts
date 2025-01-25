export type UserRole = "main_admin" | "second_admin" | "first_division" | "other_division" | "client";

export interface Meeting {
  id: number;
  companyName: string;
  contactPerson: string;
  contactNumber: string;
  meetingDate: string;
  meetingTime: string;
  clientEmails: string;
  teamEmails: string;
  status: "onboarded" | "active" | "systemUser" | "fullyCompliant";
  dateSubmitted: string;
}

export interface User {
  username: string;
  role: UserRole;
}

export interface ClientAccount {
  id: string;
  username: string;
  companyName: string;
  dateCreated: string;
  password: string;
}