import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { loadState } from "@/utils/storage";

const request = {
  private: axios.create({ baseURL: import.meta.env.VITE_APP_API_URL }),
  public: axios.create({ baseURL: import.meta.env.VITE_APP_API_URL }),
};

request.private.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = loadState("token-parking");

  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    (config.headers as AxiosHeaders).set("Authorization", `${token?.state?.token}`);
  }

  return config;
});

export async function errorHandler(error: AxiosError): Promise<void> {
  if (error.response) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token-parking");
      window.location.reload();
    }

    return await Promise.reject(error.response);
  }
  if (error.request) {
    return await Promise.reject(error.request);
  }

  console.error(error?.message);

  return await Promise.reject(error);
}

export const loginRequest = async (data: { phone_number: string; password: string }) => {
  const res = await request.public.post("user/login", data).then((res) => res);
  return res.data;
};

export default request;
