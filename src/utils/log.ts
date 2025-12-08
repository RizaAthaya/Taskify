const env = import.meta.env.VITE_ENV || import.meta.env.MODE;
const isDev = env !== "production";

type LogFn = (...args: unknown[]) => void;

interface Logger {
  error: LogFn;
  warn: LogFn;
  info: LogFn;
}

export const log: Logger = {
  error: (...args: unknown[]) => {
    if (isDev) console.error(`[${env.toUpperCase().slice(0, 3)}]`, ...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn(`[${env.toUpperCase().slice(0, 3)}]`, ...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info(`[${env.toUpperCase().slice(0, 3)}]`, ...args);
  },
};
