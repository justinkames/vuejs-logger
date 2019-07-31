import {LogLevels} from "../enum/log-levels";

export interface ILoggerOptions {
    isEnabled: boolean;
    logLevel: LogLevels;
    separator: string;
    showConsoleColors: boolean;
    showLogLevel: boolean;
    showMethodName: boolean;
    stringifyArguments: boolean;
    printLogOnConsole: boolean;
    customPrintLogMessage: (logLevel: string, logMessage: string, showConsoleColors: boolean, formattedArguments: any) => void;
}
