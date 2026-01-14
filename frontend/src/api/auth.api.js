import { api, unwrap } from "./axios";

export const authApi = {
  register: (payload) => api.post("/api/auth/register", payload).then(unwrap),
  login: (payload) => api.post("/api/auth/login", payload).then(unwrap),
};
