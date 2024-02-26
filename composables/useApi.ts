import { appendResponseHeader, H3Event } from "h3";

interface Options {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
}

export const useApi = async <T>(
  url: string,
  options: Options,
): Promise<any> => {
  const config = useRuntimeConfig();
  const baseUrl = config?.public?.NUXT_API_BASE_URL;

  return $fetch(`${baseUrl}${url}`, {
    ...options,
    credentials: "include",
  });
};
