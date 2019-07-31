import chai from "chai";
import Vue from "vue/dist/vue.min";
import VueLogger from "../src";
import {LogLevels} from "../src/vue-logger/enum/log-levels";
import {ILoggerOptions} from "../src/vue-logger/interfaces/logger-options";
import spies from 'chai-spies';

chai.use(spies);

const expect = chai.expect;
const sandbox = chai.spy.sandbox();

describe("output-no-console", () => {

    afterEach(() => {
        sandbox.restore(); // restores original methods
    });

    test("Should not show console messages with printLogOnConsole equals to false.", (done) => {
        sandbox.on(console, ['log', 'warn', 'error']);

        const options = {
            isEnabled: true,
            logLevel: LogLevels.DEBUG,
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: true,
            separator: "|",
            showConsoleColors: false,
            printLogOnConsole: false
        } as ILoggerOptions;

        Vue.use(VueLogger, options);
        const App = new Vue({
            created() {
                this.foo();
                expect(console.log).to.have.not.been.called();
                done();
            },
            methods: {
                foo() {
                    expect(Vue.$log.fatal("test")).to.exist;
                    externalFunction();
                },
            },
        });

        function externalFunction(): void {
            expect(Vue.$log.fatal("test")).to.exist;
        }
    });
});
