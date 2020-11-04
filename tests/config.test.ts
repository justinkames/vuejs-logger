import {strict, strictEqual} from "assert";
import VueLogger from "../src/index";
import {LogLevels} from "../src/enum/log-levels";

describe("isValidOptions()", () => {

    const logLevels = Object.keys(LogLevels).map((l) => l.toLowerCase());

    test("isValidOptions() should pass with correct options.", () => {
        const input = VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: false,
            showConsoleColors: false,
            format: "${methodName} ${message} ${args.join(' | ')}",
        } as any, logLevels);
        strictEqual(input, true);
    });

    test("isValidOptions() should fail with incorrect options.", () => {

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: false,
            showConsoleColors: "FOO",
            format: "${message} ${args.join(' | ')}",
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: false,
            showConsoleColors: false,
            format: 6,
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: "TEST",
            showConsoleColors: false,
            format: "${message} ${args.join(' | ')}",
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "TEST",
            stringifyArguments: false,
            showConsoleColors: false,
            format: "${message} ${args.join(' | ')}",
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            logLevel: "debug",
            isEnabled: true,
        } as any, logLevels), true);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: true,
            logLevel: "debug",
            stringifyArguments: false,
            showConsoleColors: false,
        } as any, logLevels), true);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: "",
            logLevel: "debug",
            stringifyArguments: false,
            showConsoleColors: false,
            format: "${message} ${args.join(' | ')}",
        } as any, logLevels), false);

        strictEqual(VueLogger.isValidOptions({
            isEnabled: null,
            logLevel: "debug",
            stringifyArguments: false,
            showConsoleColors: false,
            format: "${message} ${args.join(' | ')}",
        } as any, logLevels), false);
    });
});
