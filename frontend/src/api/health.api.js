import { api, unwrap } from "./axios";

export const healthApi = {
  list: () => api.get("/api/health").then(unwrap),
};
