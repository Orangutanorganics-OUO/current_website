import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    // Bypasses ngrok's free-tier browser interstitial ("You are about to
    // visit a site served through ngrok"). Any truthy value works. No-op
    // against production hosts — safe to leave in permanently.
    'ngrok-skip-browser-warning': 'true',
  },
});

export { API_BASE_URL };
