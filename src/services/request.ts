import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { loadSessionState } from "@/utils/storage";

const request = {
  private: axios.create({ baseURL: import.meta.env.VITE_APP_API_URL }),
  public: axios.create({ baseURL: import.meta.env.VITE_APP_API_URL }),
};

request.private.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = loadSessionState("token-cpm");
  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token.access}`);
  }

  return config;
});

export async function errorHandler(error: AxiosError): Promise<void> {
  if (error.response) {
    if (error.response?.status === 403) {
      const token = loadSessionState("token-cpm");
      const refresh = token?.refresh;

      if (refresh !== null) {
        try {
          // some logic
        } catch (err) {
          sessionStorage.removeItem("token-baraka");
          sessionStorage.removeItem("user-baraka");
        } finally {
          window.location.reload();
        }
      }
    }

    return await Promise.reject(error.response);
  }
  if (error.request) {
    return await Promise.reject(error.request);
  }

  console.error(error?.message);

  console.log("Error config object:", error.config);

  console.log("\nError object as json:", error.toJSON());

  return await Promise.reject(error);
}

// request.private.interceptors.response.use(
//   (response) => response,
//   async (error) => errorHandler(error),
// );

export const loginRequest = async (data: { username: string; password: string }) => {
  const res = await request.public.post("/auth-token/create/", data).then((res) => res.data);
  return res.data;
};

export const getUserData = async () => {
  const res = await request.private.get("/auth-me/");
  return res.data;
};

export default request;
