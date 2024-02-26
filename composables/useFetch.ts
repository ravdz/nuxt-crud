import type { UseFetchOptions } from "#app";
import { defu } from "defu";
import type { AsyncData } from "#app";
import { FetchError } from "ofetch";

export const useCustomFetch = async <T>(
  url: string,
  options: UseFetchOptions<T> = {},
) => {
  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: config?.public?.NUXT_API_BASE_URL as string,
    key: url,
    credentials: "include",

    // onResponseError({ response }) {
    //   if (typeof response._data === "string") {
    //     throw createError({
    //       statusCode: response.status,
    //       statusMessage: response._data,
    //       fatal: true,
    //     });
    //   } else {
    //     const { message, statusCode } = response._data;
    //     throw createError({
    //       statusCode,
    //       statusMessage: message,
    //       fatal: true,
    //     });
    //   }
    // },
  };

  const params = defu(options, defaults);

  return useFetch(url, params) as AsyncData<T, FetchError | null>;

  // const { data, error, refresh } = await useFetch(url, params);
  //
  // if (data.value === null) {
  //   let statusCode = 500;
  //   let statusMessage = "Internal Server Error";
  //   if (error.value?.statusCode && error.value?.statusMessage) {
  //     statusCode = error.value.statusCode;
  //     statusMessage = error.value.statusMessage;
  //   }
  //   throw createError({
  //     statusCode: statusCode,
  //     statusMessage: statusMessage,
  //   });
  // }
  //
  // return { data: data.value, refresh };
};
