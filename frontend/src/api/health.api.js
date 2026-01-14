import { api, unwrap } from "./axios";

export const healthApi = {
    get: () => api.get("/api/health").then(unwrap),
};