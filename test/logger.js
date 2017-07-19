import chai from 'chai'
import Vue from 'vue'
import VueLogger from '../src/logger'

const expect = chai.expect
const {print, validateOptions, initLoggerInstance, logLevels, install} = VueLogger

describe('Logger.js', () => {

    describe('install()', () => {

        it('install() should work with the correct params.', () => {
            const options = {
                logLevel: 'debug',
                stringifyByDefault: false,
                showLogLevel: false,
            }

            Vue.use({install}, options)

            new Vue({
                created() {
                    expect(this.$log).to.be.a('object')
                    expect(this.$log.debug).to.be.a('function')
                    expect(this.$log.info).to.be.a('function')
                    expect(this.$log.warn).to.be.a('function')
                    expect(this.$log.error).to.be.a('function')
                    expect(this.$log.fatal).to.be.a('function')
                }
            })

            expect(Vue.$log).to.be.a('object')
            expect(Vue.$log.debug).to.be.a('function')
            expect(Vue.$log.info).to.be.a('function')
            expect(Vue.$log.warn).to.be.a('function')
            expect(Vue.$log.error).to.be.a('function')
            expect(Vue.$log.fatal).to.be.a('function')
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
    })

    describe('initLoggerInstance()', () => {

        it('initLoggerInstance() should ignore logLevels that are more restrictive than set logLevel.', () => {
            // with options enabled
            const a = initLoggerInstance({logLevel: 'info', showLogLevel: true, stringifyArguments: true}, logLevels)
            a.debug('test')
            a.info('test', ['test args'], ['test args'])
            a.warn('test', ['test args'])
            a.error('test', 'test args')
            a.fatal('test', ['test args'], 'test args', 'test args')

            // with options disabled
            const b = initLoggerInstance({logLevel: 'info', showLogLevel: false, stringifyArguments: false}, logLevels)
            b.debug('test')
            b.info('test', ['test args'], ['test args'])
            b.warn('test', ['test args'])
            b.error('test', 'test args')
            b.fatal('test', ['test args'], 'test args', 'test args')
        })
    })

    describe('validateOptions()', () => {

        it('validateOptions() should pass with correct options.', () => {
            expect(validateOptions({
                logLevel: 'debug',
                stringifyByDefault: false,
                showLogLevel: false,
            }, logLevels)).to.equal(true)
        })

        it('validateOptions() should fail with incorrect options.', () => {
            expect(validateOptions({
                logLevel: 'debug',
                stringifyArguments: 'TEST',
                showLogLevel: false,
            }, logLevels)).to.equal(false)

            expect(validateOptions({
                logLevel: 'debug',
                stringifyArguments: false,
                showLogLevel: 'TEST',
            }, logLevels)).to.equal(false)

            expect(validateOptions({
                logLevel: 'TEST',
                stringifyArguments: false,
                showLogLevel: false,
            }, logLevels)).to.equal(false)
        })
    })

    describe('print()', () => {

        it('print() should use console.error() with fatal logLevel', () => {
            print('fatal', 'fatal |', ['test'])
        })

        it('print() should use console.error() with error logLevel', () => {
            print('error', 'error |', ['test'])
        })

        it('print() should use console.log() with any other logLevel', () => {
            print('debug', 'debug |', ['test'])
        })
    })
})
