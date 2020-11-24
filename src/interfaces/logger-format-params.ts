import {LogLevels} from "../enum/log-levels";


export interface ILoggerFormatParams {
    message: string;
    methodName: string;
    level: LogLevels;
    args: any[];
}
