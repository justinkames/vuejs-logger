import {LogLevels} from "./enum/log-levels";
import {ILogger} from "./interfaces/logger";
import {ILoggerFormatParams} from "./interfaces/logger-format-params";
import {ILoggerOptions} from "./interfaces/logger-options";

class VueLogger implements ILogger {

    private errorMessage: string = "Provided options for vuejs-logger are not valid.";
    private logLevels: string[] = Object.keys(LogLevels).map((l) => l.toLowerCase());

    public install(Vue: any, options: ILoggerOptions) {
        options = Object.assign(this.getDefaultOptions(), options);

        if (this.isValidOptions(options, this.logLevels)) {
            Vue.$log = this.initLoggerInstance(options, this.logLevels);
            Vue.prototype.$log = Vue.$log;
        } else {
            throw new Error(this.errorMessage);
        }
    }

    public isValidOptions(options: ILoggerOptions, logLevels: string[]): boolean {
        if (!(options.logLevel && typeof options.logLevel === "string" && logLevels.indexOf(options.logLevel) > -1)) {
            return false;
        }
        if (options.stringifyArguments && typeof options.stringifyArguments !== "boolean") {
            return false;
        }
        if (options.showConsoleColors && typeof options.showConsoleColors !== "boolean") {
            return false;
        }
        if (options.format && typeof options.format !== "string") {
            return false;
        }
        return typeof options.isEnabled === "boolean";
    }

    private getMethodName(): string {
        let error = {} as any;

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
        if (stackTrace && stackTrace.indexOf(".") > -1) {
            stackTrace = stackTrace.split(".")[1];
        }
        return stackTrace;
    }

    private initLoggerInstance(options: ILoggerOptions, logLevels: string[]) {
        const logger = {};
        logLevels.forEach((logLevel) => {
                if (logLevels.indexOf(logLevel) >= logLevels.indexOf(options.logLevel) && options.isEnabled) {
                    logger[logLevel] = (message, ...args) => {
                        const formattedArguments = options.stringifyArguments ? args.map((a) => JSON.stringify(a)) : args;
                        const formatParams: ILoggerFormatParams = {
                            message,
                            methodName: this.getMethodName(),
                            level: logLevel as LogLevels,
                            args: formattedArguments,
                        }
                        const logMessage = this.interpolateTemplateString(options.format, formatParams);
                        this.printLogMessage(logLevel, logMessage, options.showConsoleColors, formattedArguments);
                        return `${logMessage} ${formattedArguments.toString()}`;
                    };
                } else {
                    logger[logLevel] = () => undefined;
                }
            },
        );
        return logger;
    }

    private interpolateTemplateString(templateString: string, params: {[key: string]: any}): string {
        const names = Object.keys(params)
        return new Function(`const \{${names}\} = this; return \`${templateString}\`;`).call(params);
    }

    private printLogMessage(logLevel: string, logMessage: string, showConsoleColors: boolean, formattedArguments: any) {
        if (showConsoleColors && (logLevel === "warn" || logLevel === "error" || logLevel === "fatal")) {
            console[logLevel === "fatal" ? "error" : logLevel](logMessage, ...formattedArguments);
        } else {
            console.log(logMessage, ...formattedArguments);
        }
    }

    private getDefaultOptions(): ILoggerOptions {
        return {
            isEnabled: true,
            logLevel: LogLevels.DEBUG,
            showConsoleColors: false,
            stringifyArguments: false,
            format: "${message} ${args.join(' | ')}",
        };
    }
}

export default new VueLogger();
