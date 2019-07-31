import {notStrictEqual, strictEqual} from "assert";
import chai from "chai";
import Vue from "vue/dist/vue.min";
import VueLogger from "../src";
import {LogLevels} from "../src/vue-logger/enum/log-levels";
import {ILoggerOptions} from "../src/vue-logger/interfaces/logger-options";
const expect = chai.expect;

describe("vue-logger.ts", () => {

    test("install() should work as expected with the correct params.", () => {
        const options: ILoggerOptions = {
            isEnabled: true,
            logLevel: LogLevels.FATAL,
            separator: "|",
            stringifyArguments: false,
            showConsoleColors: true,
            showLogLevel: false,
            showMethodName: false,
            printLogOnConsole: true,
            customPrintLogMessage: null
        };
        Vue.use(VueLogger, options);
        expect(Vue.$log).to.be.a("object");
        strictEqual(Vue.$log.debug("debug"), undefined);
        strictEqual(Vue.$log.info("info"), undefined);
        strictEqual(Vue.$log.warn("warn"), undefined);
        strictEqual(Vue.$log.error("error"), undefined);
        expect(Vue.$log.fatal("fatal")).to.exist;
    });

    test("install() should throw an error with the an incorrect parameter.", () => {
        const options: any = {
            isEnabled: true,
            logLevel: LogLevels.DEBUG,
            separator: "|",
            stringifyArguments: false,
            showConsoleColors: true,
            showLogLevel: false,
            showMethodName: "wrong value for test.",
        };
        expect(() => {
            VueLogger.install(Vue, options);
        })
            .to
            .throw(Error, "Provided options for vuejs-logger are not valid.");
    });
});
