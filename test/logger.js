import Vue from 'vue/dist/vue.min'
import VueLogger from '../src/logger'
import chai from 'chai'

const {print, isValidOptions, initLoggerInstance, logLevels, install} = VueLogger
const expect = chai.expect

describe('Logger.js', () => {
    describe('getMethodName()', () => {
        it('Should show the parent function.', () => {
            const options = {
                isEnabled: true,
                logLevel: 'debug',
                stringifyByDefault: false,
                showLogLevel: false,
                showMethodName: true,
                separator: '|',
                showConsoleColors: false,
            }
            Vue.use({install}, options)

            new Vue({
                created () {
                    this.foo()
                },
                template: '<bar></bar>',
                methods: {
                    foo () {
                        this.$log.fatal('first level call.')
                        externalFunction()
                    }
                }
            })

            function externalFunction () {
                Vue.$log.fatal('calling external function.')
            }
        })
    })
    describe('install()', () => {

        it('install() should work with the correct params.', () => {
            const options = {
                isEnabled: true,
                logLevel: 'debug',
                stringifyByDefault: false,
                showLogLevel: false,
                showMethodName: false,
                separator: '|',
                showConsoleColors: true,
            }
            Vue.use({install}, options)
            expect(Vue.$log).to.be.a('object')
            expect(Vue.$log.debug).to.be.a('function')
            expect(Vue.$log.info).to.be.a('function')
            expect(Vue.$log.warn).to.be.a('function')
            expect(Vue.$log.error).to.be.a('function')
            expect(Vue.$log.fatal).to.be.a('function')
        })

        it('install() should throw an error with the an incorrect log showMethodName parameter.', () => {
            const options = {
                showMethodName: 'foo'
            }
            expect(() => { install(Vue, options) })
              .to
              .throw(Error, 'Provided options for vuejs-logger are not valid.')
        })

        it('install() should throw an error with the an incorrect log level.', () => {
            const options = {
                logLevel: 'foo'
            }
            expect(() => { install(Vue, options) })
              .to
              .throw(Error, 'Provided options for vuejs-logger are not valid.')
        })

        it('install() should throw an error with the an incorrect log level.', () => {
            const options = {
                logLevel: false
            }
            expect(() => { install(Vue, options) })
              .to
              .throw(Error, 'Provided options for vuejs-logger are not valid.')
        })

        it('install() should throw an error with the an incorrect log level.', () => {
            const options = {
                logLevel: undefined
            }
            expect(() => { install(Vue, options) })
              .to
              .throw(Error, 'Provided options for vuejs-logger are not valid.')
        })

        it('install() should throw an error with the an incorrect log level.', () => {
            const options = {
                logLevel: null
            }
            expect(() => { install(Vue, options) })
              .to
              .throw(Error, 'Provided options for vuejs-logger are not valid.')
        })

        it('install() should throw an error with the an incorrect isEnabled value', () => {
            const options = {
                isEnabled: null
            }
            expect(() => { install(Vue, options) })
                .to
                .throw(Error, 'Provided options for vuejs-logger are not valid.')
        })
    })

    describe('initLoggerInstance()', () => {

        it('initLoggerInstance() should ignore logLevels that are more restrictive than set logLevel.', function testFn () {
            // with options enabled
            const a = initLoggerInstance({
                logLevel: 'info',
                showLogLevel: true,
                stringifyArguments: true,
                showMethodName: false,
                separator: '|',
                showConsoleColors: false,
            }, logLevels)
            a.debug('test')
            a.info('test', ['test args'], ['test args'])
            a.warn('test', ['test args'])
            a.error('test', 'test args')
            a.fatal('test', ['test args'], 'test args', 'test args')
            // with options disabled
            const b = initLoggerInstance({
                logLevel: 'info',
                showLogLevel: false,
                stringifyArguments: false,
                showMethodName: true,
                separator: '|',
                showConsoleColors: false,
            }, logLevels)
            b.debug('test')
            b.info('test', ['test args'], ['test args'])
            b.warn('test', ['test args'])
            b.error('test', 'test args')
            b.fatal('test', ['test args'], 'test args', 'test args')
        })
    })

    describe('isValidOptions()', () => {

        it('isValidOptions() should pass with correct options.', () => {
            expect(isValidOptions({
                isEnabled: true,
                logLevel: 'debug',
                stringifyByDefault: false,
                showLogLevel: false,
                showMethodName: true,
                separator: '|',
                showConsoleColors: false,
            }, logLevels)).to.equal(true)
        })

        it('isValidOptions() should fail with incorrect options.', () => {

            expect(isValidOptions({
                isEnabled: true,
                logLevel: 'debug',
                stringifyByDefault: false,
                showLogLevel: false,
                showMethodName: true,
                separator: '|||||',
                showConsoleColors: false,
            }, logLevels)).to.equal(false)

            expect(isValidOptions({
                isEnabled: true,
                logLevel: 'debug',
                stringifyByDefault: false,
                showLogLevel: false,
                showMethodName: true,
                separator: '|',
                showConsoleColors: 'FOO',
            }, logLevels)).to.equal(false)

            expect(isValidOptions({
                isEnabled: true,
                logLevel: 'debug',
                stringifyArguments: false,
                showLogLevel: false,
                showMethodName: 'TEST',
                separator: '|',
                showConsoleColors: false,
            }, logLevels)).to.equal(false)

            expect(isValidOptions({
                isEnabled: true,
                logLevel: 'debug',
                stringifyArguments: 'TEST',
                showLogLevel: false,
                showMethodName: false,
                separator: '|',
                showConsoleColors: false,
            }, logLevels)).to.equal(false)

            expect(isValidOptions({
                isEnabled: true,
                logLevel: 'debug',
                stringifyArguments: false,
                showLogLevel: 'TEST',
                showMethodName: false,
                separator: '|',
                showConsoleColors: false,
            }, logLevels)).to.equal(false)

            expect(isValidOptions({
                isEnabled: true,
                logLevel: 'TEST',
                stringifyArguments: false,
                showLogLevel: false,
                showMethodName: false,
                separator: '|',
                showConsoleColors: false,
            }, logLevels)).to.equal(false)

            expect(isValidOptions({
                logLevel: 'debug',
                isEnabled: true,
            }, logLevels)).to.equal(true)

            expect(isValidOptions({
                isEnabled: '',
                logLevel: 'debug',
                separator: '1234',
            }, logLevels)).to.equal(false)

            expect(isValidOptions({
                isEnabled: true,
                logLevel: 'debug',
                stringifyArguments: false,
                showLogLevel: false,
                showMethodName: false,
                separator: '|',
                showConsoleColors: false,
            }, logLevels)).to.equal(true)

            expect(isValidOptions({
                isEnabled: false,
                logLevel: 'debug',
                stringifyArguments: false,
                showLogLevel: false,
                showMethodName: false,
                separator: '|',
                showConsoleColors: false,
            }, logLevels)).to.equal(true)

            expect(isValidOptions({
                isEnabled: '',
                logLevel: 'debug',
                stringifyArguments: false,
                showLogLevel: false,
                showMethodName: false,
                separator: '|',
                showConsoleColors: false,
            }, logLevels)).to.equal(false)

            expect(isValidOptions({
                isEnabled: null,
                logLevel: 'debug',
                stringifyArguments: false,
                showLogLevel: false,
                showMethodName: false,
                separator: '|',
                showConsoleColors: false,
            }, logLevels)).to.equal(false)

        })
    })

    describe('print()', () => {
        it('print() should use console.error() with fatal logLevel', () => {
            print('fatal', 'fatal |', 'METHOD NAME | ', ['test'], true)
        })
        it('print() should use console.error() with error logLevel', () => {
            print('error', 'error |', 'METHOD NAME |', ['test'], true)
        })
        it('print() should use console.log() with any other logLevel', () => {
            print('debug', 'debug |', 'METHOD NAME |', ['test'], false)
        })
    })
})
