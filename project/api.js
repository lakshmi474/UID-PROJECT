import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function getInfants(params) {
  const { data } = await api.get('/infants', { params });
  return data;
}

export async function getInfant(id) {
  const { data } = await api.get(`/infants/${id}`);
  return data;
}

export async function createInfant(payload) {
  const { data } = await api.post('/infants', payload);
  return data;
}

export async function updateInfant(id, payload) {
  const { data } = await api.put(`/infants/${id}`, payload);
  return data;
}

export async function deleteInfant(id) {
  const { data } = await api.delete(`/infants/${id}`);
  return data;
}

export function exportCsv() {
  window.location.href = 'http://localhost:5000/api/infants/export/csv';
}

export function exportPdf() {
  window.location.href = 'http://localhost:5000/api/infants/export/pdf';
}

// Auth endpoints
export async function signup(payload) {
  const { data } = await api.post('/auth/signup', payload);
  return data;
}

export async function login(payload) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function forgotPassword(email) {
  const { data } = await api.post('/auth/forgot', { email });
  return data; // { success, token?, expiresAt? }
}

export async function resetPassword({ token, password }) {
  const { data } = await api.post('/auth/reset', { token, password });
  return data; // { success: true }
}
