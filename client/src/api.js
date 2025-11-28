import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const api = axios.create({ baseURL: API_BASE });

// Token + user helpers
export function getToken() {
  return localStorage.getItem("token");
}
export function setToken(t) {
  localStorage.setItem("token", t);
}
export function clearToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
export function setUser(u) {
  localStorage.setItem("user", JSON.stringify(u));
}
export function getUser() {
  const s = localStorage.getItem("user");
  return s ? JSON.parse(s) : null;
}

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export async function register(payload) {
  const { data } = await api.post("/api/auth/register", payload);
  setToken(data.token);
  setUser(data.user);
  return data;
}
export async function login(payload) {
  const { data } = await api.post("/api/auth/login", payload);
  setToken(data.token);
  setUser(data.user);
  return data;
}

export function me() {
  const token = getToken();
  const user = getUser();
  return { token, user };
}

// Activities
export async function createActivity(payload) {
  const { data } = await api.post("/api/activities", payload);
  return data;
}
export async function listActivities(params = {}) {
  const { data } = await api.get("/api/activities", { params });
  return data;
}
export async function getFootprint(params = {}) {
  const { data } = await api.get("/api/footprint", { params });
  return data;
}

// Leaderboard
export async function getLeaderboard() {
  const { data } = await api.get("/api/leaderboard");
  return data;
}

// Reports
export async function getReports(period = "month") {
  const { data } = await api.get("/api/reports", { params: { period } });
  return data;
}

// Pledges
export async function listPledges() {
  const { data } = await api.get("/api/pledges");
  return data;
}
export async function createPledge(payload) {
  const { data } = await api.post("/api/pledges", payload);
  return data;
}
export async function completePledge(id) {
  const { data } = await api.post(`/api/pledges/${id}/complete`);
  return data;
}
export async function togglePledge(id) {
  const { data } = await api.post(`/api/pledges/${id}/toggle`);
  return data;
}

// Admin
export async function adminListUsers() {
  const { data } = await api.get("/api/admin/users");
  return data;
}
export async function adminSetRole(id, role) {
  const { data } = await api.post(`/api/admin/users/${id}/role`, { role });
  return data;
}
export async function adminListActivities(params = {}) {
  const { data } = await api.get("/api/admin/activities", { params });
  return data;
}
export async function adminDeleteActivity(id) {
  const { data } = await api.delete(`/api/admin/activities/${id}`);
  return data;
}
