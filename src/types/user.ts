import { ReactNode } from "react";

export type UserRole = "main_admin" | "second_admin" | "client" | "vp_admin";

export interface Meeting {
  payrollStatus: ReactNode;
  userId: number;
  id: number;
  companyName: string;
  contactPerson: string;
  contactNumber: string;
  employeeNumber: | "";
  meetingDate: string;
  meetingTime: string;
  clientEmails: string;
  teamEmails: string;
  status: "Pending" | "Confirmed" | "Endorsed";
  dateSubmitted: string;
  assignedTo?: string;
}

export interface User {
  username: string;
  role: UserRole;
}

export interface ClientAccount {  
  id: string;  
  username: string;
  dateCreated: string;
  password: string;
}