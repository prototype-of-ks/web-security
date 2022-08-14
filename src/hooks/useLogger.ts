import chalk from '@alita/chalk';
import { AlitaChalk } from '@alita/chalk';

type LoggerKeys<T = AlitaChalk> = keyof Omit<T, 'hello'>;

type Logger = {
  [K in keyof AlitaChalk]: (...input: string[]) => void;
};

const log = console.log;

let logger: Partial<Logger> = {};
for (const key in chalk) {
  if (key !== 'hello') {
    logger[key as LoggerKeys] = (...input: string[]) => {
      const logs = chalk[key as LoggerKeys](input.splice(0, 1)[0]);
      if (logs) {
        log(...logs, ...input);
      }
    };
  }
}

export default function useLogger() {
  return logger as Logger;
}