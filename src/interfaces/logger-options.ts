import {LogLevels} from "../enum/log-levels";

export interface ILoggerOptions {
    isEnabled: boolean;
    logLevel: LogLevels;
    showConsoleColors: boolean;
    stringifyArguments: boolean;
    format: string;
}
