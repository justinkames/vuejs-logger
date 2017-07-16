import chai from 'chai'
const expect = chai.expect
import VueLogger from '../src/logger'
const {print, validateOptions, initLoggerInstance, logLevels, install} = VueLogger()

describe('Logger.js', () => {

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

    describe('install()', () => {

        it('install() should work with the correct params.', () => {
            const Vue = () => {}
            const options = {
                logLevel: 'debug',
                stringifyByDefault: false,
                showLogLevel: false,
            }
            install(Vue, options)
            Vue()

            expect(Vue.prototype.$log).to.be.a('object')
            expect(Vue.prototype.$log.debug).to.be.a('function')
            expect(Vue.prototype.$log.info).to.be.a('function')
            expect(Vue.prototype.$log.warn).to.be.a('function')
            expect(Vue.prototype.$log.error).to.be.a('function')
            expect(Vue.prototype.$log.fatal).to.be.a('function')
        })

        it('install() should throw an error with the an incorrect log level.', () => {
            const options = {
                logLevel: 'foo'
            }
            expect(() => { install(() => {}, options) })
              .to
              .throw(Error, 'Provided options for vuejs-logger are not valid.')
        })

        it('install() should throw an error with the an incorrect log level.', () => {
            const options = {
                logLevel: false
            }
            expect(() => { install(() => {}, options) })
              .to
              .throw(Error, 'Provided options for vuejs-logger are not valid.')
        })

        it('install() should throw an error with the an incorrect log level.', () => {
            const options = {
                logLevel: undefined
            }
            expect(() => { install(() => {}, options) })
              .to
              .throw(Error, 'Provided options for vuejs-logger are not valid.')
        })

        it('install() should throw an error with the an incorrect log level.', () => {
            const options = {
                logLevel: null
            }
            expect(() => { install(() => {}, options) })
              .to
              .throw(Error, 'Provided options for vuejs-logger are not valid.')
        })
    })
})
