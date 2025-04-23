interface Config {
  apiUrl: string;
  apiEndPoint: string;
  appName: string;
}

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  apiEndPoint: import.meta.env.VITE_API_ENDPOINT || "api/",
  appName: import.meta.env.VITE_APP_NAME || "React Vite Application",
};

export { config };
