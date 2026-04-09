import { AsyncLocalStorage } from "async_hooks";

type RunContext = {
  requestedBy: string;
};

const runContextStore = new AsyncLocalStorage<RunContext>();

export const withRequesterContext = async <T>(
  requestedBy: string,
  runFn: () => Promise<T>
): Promise<T> => {
  return await runContextStore.run({ requestedBy }, runFn);
};

export const getRequestedByFromContext = (): string | null => {
  return runContextStore.getStore()?.requestedBy ?? null;
};
