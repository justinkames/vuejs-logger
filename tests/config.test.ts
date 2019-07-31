import {strict, strictEqual} from "assert";
import VueLogger from "../src";
import {LogLevels} from "../src/vue-logger/enum/log-levels";

describe("isValidOptions()", () => {

    const logLevels = Object.keys(LogLevels).map((l) => l.toLowerCase());

    test("isValidOptions() should pass with correct options.", () => {
        const input = VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: true,
            separator: "|",
            showConsoleColors: false,
        } as any, logLevels);
        strictEqual(input, true);
    });

    test("isValidOptions() should pass with correct customPrintLogMessage.", () => {
        const func:(logLevel: string, logMessage: string, showConsoleColors: boolean, formattedArguments: any) => void = function testFunction (a:string, b:string, c:boolean, d:any) { return; };
        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: true,
            separator: "|",
            showConsoleColors: false,
            customPrintLogMessage: func,
        } as any, logLevels), true);
    });

    test("isValidOptions() should fail with incorrect options.", () => {

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: true,
            separator: "|||||",
            showConsoleColors: false,
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: true,
            separator: "|",
            showConsoleColors: "FOO",
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: "TEST",
            separator: "|",
            showConsoleColors: false,
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: "TEST",
            showLogLevel: false,
            showMethodName: false,
            separator: "|",
            showConsoleColors: false,
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: false,
            showLogLevel: "TEST",
            showMethodName: false,
            separator: "|",
            showConsoleColors: false,
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "TEST",
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: false,
            separator: "|",
            showConsoleColors: false,
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            logLevel: "debug",
            isEnabled: true,
        } as any, logLevels), true);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: "",
            logLevel: "debug",
            separator: "1234",
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: false,
            separator: "|",
            showConsoleColors: false,
            printLogOnConsole: true,
            customPrintLogMessage: null
        } as any, logLevels), true);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: false,
            logLevel: "debug",
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: false,
            separator: "|",
            showConsoleColors: false,
        } as any, logLevels), true);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: "",
            logLevel: "debug",
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: false,
            separator: "|",
            showConsoleColors: false,
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: null,
            logLevel: "debug",
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: false,
            separator: "|",
            showConsoleColors: false,
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            logLevel: "debug",
            isEnabled: true,
            printLogOnConsole: 'false'
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            logLevel: "debug",
            isEnabled: true,
            customPrintLogMessage: 'non function'
        } as any, logLevels), false);
    });
});
