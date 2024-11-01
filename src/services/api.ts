import axios from "axios";

const API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export const tracks = {
  getAll: async () => {
    const response = await api.get("/tracks");
    return response.data;
  },
  create: async (formData: FormData) => {
    const response = await api.post("/tracks", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  update: async (id: string, formData: FormData) => {
    const response = await api.patch(`/tracks/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/tracks/${id}`);
    return response.data;
  },
};

export const events = {
  getAll: async () => {
    const response = await api.get("/events");
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  create: async (formData: FormData) => {
    const response = await api.post("/events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  update: async (id: string, formData: FormData) => {
    const response = await api.patch(`/events/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },
};

export const merchandise = {
  getAll: async () => {
    const response = await api.get("/merchandise");
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/merchandise/${id}`);
    return response.data;
  },

  create: async (formData: FormData) => {
    const response = await api.post("/merchandise", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  update: async (id: string, formData: FormData) => {
    const response = await api.patch(`/merchandise/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/merchandise/${id}`);
    return response.data;
  },

  updateStock: async (id: string, stockCount: number) => {
    const response = await api.patch(`/merchandise/${id}/stock`, {
      stockCount,
    });
    return response.data;
  },
};
