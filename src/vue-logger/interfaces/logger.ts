import { ILoggerOptions } from "./logger-options";

export interface ILogger {
  install(Vue: any, options: ILoggerOptions);

  isValidOptions(options: ILoggerOptions, logLevels: string[]): boolean;
}
