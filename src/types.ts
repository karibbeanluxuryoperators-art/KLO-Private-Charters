/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Inquiry {
  client_name: string;
  email: string;
  phone: string;
  country: string;
  origin_airport: string;
  destination_airport: string;
  departure_date: string;
  return_date?: string | null;
  passengers: number;
  cabin_class: string;
  special_requests: string;
  status: "pending" | "contacted" | "quoted";
  createdAt: any; // Firestore Timestamp
}

export type ChatStep = 
  | "name"
  | "company"
  | "contact"
  | "country"
  | "route"
  | "schedule"
  | "flexibility"
  | "passengers"
  | "pets"
  | "luggage"
  | "amenities"
  | "additional"
  | "restrictions"
  | "confirm"
  | "complete";

export interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}
