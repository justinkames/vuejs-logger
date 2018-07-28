import {LogLevel} from "./enum/log-levels";
import {ILogger} from "./interfaces/logger";
import {ILoggerOptions} from "./interfaces/logger-options";

class VueLogger implements ILogger {

    public errorMessage: string = "Provided options for vuejs-logger are not valid.";
    public logLevels: string[] = Object.keys(LogLevel).map((l) => l.toLowerCase());

    public install(Vue: any, options: ILoggerOptions) {
        options = Object.assign(this.getDefaultOptions(), options);

        if (this.isValidOptions(options, this.logLevels)) {
            Vue.$log = this.initLoggerInstance(options, this.logLevels);
            Vue.prototype.$log = Vue.$log;
        } else {
            throw new Error(this.errorMessage);
        }
    }

    public getMethodName(): string {
        let error = {stack: ""};

        try {
            throw new Error("");
        } catch (e) {
            error = e;
        }
        // IE9 does not have .stack property
        if (error.stack === undefined) {
            return "";
        }
        let stackTrace = error.stack.split("\n")[3];
        if (/ /.test(stackTrace)) {
            stackTrace = stackTrace.trim().split(" ")[1];
        }
        if (stackTrace && stackTrace.includes(".")) {
            stackTrace = stackTrace.split(".")[1];
        }
        return stackTrace;
    }

    public initLoggerInstance(options: ILoggerOptions, logLevels: string[]) {
        const logger = {};
        logLevels.forEach((logLevel) => {
                if (logLevels.indexOf(logLevel) >= logLevels.indexOf(options.logLevel) &&
                    options.isEnabled) {
                    logger[logLevel] = (...args) => {
                        const methodName = this.getMethodName();
                        const methodNamePrefix = options.showMethodName ? methodName + ` ${options.separator} ` : "";
                        const logLevelPrefix = options.showLogLevel ? logLevel + ` ${options.separator} ` : "";
                        const formattedArguments = options.stringifyArguments ? args.map((a) => JSON.stringify(a)) : args;
                        this.print(logLevel, logLevelPrefix, methodNamePrefix, formattedArguments, options.showConsoleColors);
                    };
                } else {
                    logger[logLevel] = () => {
                    };
                }
            },
        );
        return logger;
    }

    public isValidOptions(options: ILoggerOptions, logLevels: string[]): boolean {
        if (!(options.logLevel && typeof options.logLevel === "string" && logLevels.indexOf(options.logLevel) > -1)) {
            return false;
        }
        if (options.stringifyArguments && typeof options.stringifyArguments !== "boolean") {
            return false;
        }
        if (options.showLogLevel && typeof options.showLogLevel !== "boolean") {
            return false;
        }
        if (options.showConsoleColors && typeof options.showConsoleColors !== "boolean") {
            return false;
        }
        if (options.separator && (typeof options.separator !== "string" || (typeof options.separator === "string" && options.separator.length > 3))) {
            return false;
        }
        if (typeof options.isEnabled !== "boolean") {
            return false;
        }
        return !(options.showMethodName && typeof options.showMethodName !== "boolean");
    }

    public print(logLevel: string, logLevelPrefix: string, methodNamePrefix: string, formattedArguments: any[], showConsoleColors: boolean) {
        if (showConsoleColors && (logLevel === "warn" || logLevel === "error" || logLevel === "fatal")) {
            console[logLevel === "fatal" ? "error" : logLevel](logLevelPrefix, methodNamePrefix, ...formattedArguments);
        } else {
            console.log(logLevelPrefix, methodNamePrefix, ...formattedArguments);
        }
    }

    public getDefaultOptions(): ILoggerOptions {
        return {
            isEnabled: true,
            logLevel: LogLevel.DEBUG,
            separator: "|",
            showConsoleColors: false,
            showLogLevel: false,
            showMethodName: false,
            stringifyArguments: false,
        };
    }
}

export default new VueLogger();
