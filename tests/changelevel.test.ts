import { notStrictEqual, strictEqual } from "assert";
import chai from "chai";
import Vue from "vue/dist/vue.min";
import VueLogger from "../src";
import { LogLevels } from "../src/vue-logger/enum/log-levels";
import { ILoggerOptions } from "../src/vue-logger/interfaces/logger-options";
const expect = chai.expect;

describe("changeLoglevel()", () => {

    test("changeLogLevel('info') should set the loglevel to info after initialisation.", () => {
        const options: ILoggerOptions = {
            isEnabled: true,
            logLevel: LogLevels.ERROR,
            separator: "|",
            stringifyArguments: false,
            showConsoleColors: true,
            showLogLevel: false,
            showMethodName: false,
        };
        Vue.use(VueLogger, options);
        expect(Vue.$log).to.be.a("object");
        strictEqual(Vue.$log.debug("debug"), undefined);
        strictEqual(Vue.$log.info("info"), undefined);
        strictEqual(Vue.$log.warn("warn"), undefined);
        expect(Vue.$log.error("error")).to.exist;
        expect(Vue.$log.fatal("fatal")).to.exist;
        Vue.$log.changeLogLevel('info');
        strictEqual(Vue.$log.debug("debug"), undefined);
        expect(Vue.$log.error("info")).to.exist;
        expect(Vue.$log.error("warn")).to.exist;
        expect(Vue.$log.error("error")).to.exist;
        expect(Vue.$log.error("fatal")).to.exist;
    });
});
