export type LeadStatus = "New" | "Contacted" | "Closed";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  message: string;
  status: LeadStatus;
  created_at: string;
}
