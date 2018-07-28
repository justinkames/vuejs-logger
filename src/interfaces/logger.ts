import {ILoggerOptions} from "./logger-options";

export interface ILogger {

    install(Vue: any, options: ILoggerOptions);

    initLoggerInstance(options: ILoggerOptions, logLevels: string[]);

    print(logLevel: string, logLevelPrefix: string, methodNamePrefix: string, formattedArguments: any[], showConsoleColors: boolean);

    isValidOptions(options: ILoggerOptions, logLevels: string[]): boolean;

    getMethodName();

    getDefaultOptions(): ILoggerOptions;
}
