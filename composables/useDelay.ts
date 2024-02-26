export const useDelay = (ms: number) =>
  new Promise(async (resolve, reject) => setTimeout(resolve, ms));
