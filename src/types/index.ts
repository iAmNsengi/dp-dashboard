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

export interface Merchandise {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
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
  eventType: string;
  image: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}
