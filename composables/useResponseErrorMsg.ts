export const useResponseErrorMsg = (error: any): string => {
  let message: string = "Unknown error";
  if (typeof error?.data === "string") {
    message = error.data;
  } else if (typeof error?.data?.message === "string") {
    message = error.data.message;
  } else if (Array.isArray(error.data.message)) {
    message = error.data.message[0];
  }
  return message;
};
