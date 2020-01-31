import chai from "chai";
import Vue from "vue/dist/vue.min";
import VueLogger from "../src/index";
import {LogLevels} from "../src/enum/log-levels";
import {ILoggerOptions} from "../src/interfaces/logger-options";

const expect = chai.expect;

describe("output", () => {
    test("Should instantiate log functions and be reachable from external functions.", (done) => {
        const options = {
            isEnabled: true,
            logLevel: LogLevels.DEBUG,
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: true,
            separator: "|",
            showConsoleColors: false,
        } as ILoggerOptions;

        Vue.use(VueLogger, options);
        const App = new Vue({
            created() {
                this.foo();
                done();
            },
            methods: {
                foo() {
                    expect(Vue.$log.fatal("test")).to.exist;
                    expect(Vue.$log.error("error")).to.exist;
                    expect(Vue.$log.warn("warn")).to.exist;
                    expect(Vue.$log.info("info")).to.exist;
                    expect(Vue.$log.debug("debug")).to.exist;
                    externalFunction();
                },
            },
        });

        function externalFunction(): void {
            expect(Vue.$log.fatal("test")).to.exist;
            expect(Vue.$log.fatal("test")).to.contains("externalFunction");
        }
    });
});
