import {LogLevel} from "../enum/log-levels";

export interface ILoggerOptions {
    isEnabled: boolean;
    logLevel: LogLevel;
    separator: string;
    showConsoleColors: boolean;
    showLogLevel: boolean;
    showMethodName: boolean;
    stringifyArguments: boolean;
}
