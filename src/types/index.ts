export interface User {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "editor" | "user";
  profileImage?: string;
}

export interface Track {
  _id: string;
  title: string;
  featuring?: string;
  coverImage: string;
  audioFile: string;
  releaseDate: string;
  createdAt: string;
}

export const MERCHANDISE_CATEGORIES = [
  "T-Shirt",
  "Cap",
  "Crop Top",
  "Hoodie",
  "Sweatshirt",
  "Accessory",
  "Other",
] as const;

export type MerchandiseCategory = (typeof MERCHANDISE_CATEGORIES)[number];

export interface Merchandise {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: MerchandiseCategory;
  images: string[];
  totalStock: number;
  stockCount: number;
  inStock: boolean;
  createdAt: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  eventType: string;
  image: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}
