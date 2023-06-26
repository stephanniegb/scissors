import.meta.env.VITE_SERVER_ENDPOINT;

export const SERVER_ENDPOINTS =
  import.meta.env.VITE_SERVER_ENDPOINT || "http://localhost:4000";
