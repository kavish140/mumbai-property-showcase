export type PropertyStatus = "Available" | "Sold" | "Pending";
export type PropertyType = "Residential" | "Commercial" | "Land" | "Luxury";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number; // INR
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  description: string;
  imageUrl: string;
  youtubeUrl?: string;
}

export function formatINR(value: number): string {
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(2)} Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(2)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}
