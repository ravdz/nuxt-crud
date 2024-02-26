interface Output {
  statusCode: number;
  statusMessage: string;
}

export const useError = (error: any): Output => {
  let statusCode = 500;
  let statusMessage = "Internal error";

  if (typeof error.data === "string") {
    statusCode = error.statusCode;
    statusMessage = error.data;
  } else if (!!error.data.message) {
    statusCode = error.data.statusCode;
    statusMessage = error.data.message;
  }

  return {
    statusCode,
    statusMessage,
  };
};
