import chai from "chai";
import Vue from "vue/dist/vue.min";
import VueLogger from "../src";
import {LogLevels} from "../src/vue-logger/enum/log-levels";
import {ILoggerOptions} from "../src/vue-logger/interfaces/logger-options";

const expect = chai.expect;

describe("output-custom-logfuncton", () => {

    test("Should call customPrintLogMessage when available.", (done) => {
        const options = {
            isEnabled: true,
            logLevel: LogLevels.DEBUG,
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: true,
            separator: "|",
            showConsoleColors: false,
            printLogOnConsole: false,
            customPrintLogMessage: (logLevel: string, logMessage: string, showConsoleColors: boolean, formattedArguments: any) => {
                expect(logLevel).to.exist;
                expect(logMessage).to.exist;
                expect(showConsoleColors).to.exist;
                expect(formattedArguments).to.exist;
                console.log(formattedArguments)
                if (formattedArguments == "done") { // has done?
                    console.log("CHEGUEI")
                    done();
                }
            }
        } as ILoggerOptions;

        Vue.use(VueLogger, options);
        const App = new Vue({
            created() {
                this.foo();
            },
            methods: {
                foo() {
                    expect(Vue.$log.fatal("test")).to.exist;
                    externalFunction();
                },
            },
        });

        function externalFunction(): void {
            expect(Vue.$log.fatal("done")).to.exist;
        }
    });
});
