export default function () {

    const logLevels = ['debug', 'info', 'warn', 'error', 'fatal']

    function initLoggerInstance (options, logLevels) {
        const logger = {}
        logLevels.forEach(logLevel => {
            if (logLevels.indexOf(logLevel) >= logLevels.indexOf(options.logLevel)) {
                logger[logLevel] = (...args) => {
                    const prefix = options.showLogLevel ? logLevel + ' | ' : ''
                    const formattedArguments = options.stringifyArguments ? args.map(a => JSON.stringify(a)) : args
                    print(logLevel, prefix, formattedArguments)
                }
            } else {
                logger[logLevel] = () => {}
            }
        })
        return logger
    }

    function print (logLevel, prefix, formattedArguments) {
        if (logLevel === 'warn' || logLevel === 'error' || logLevel === 'fatal') {
            console[logLevel === 'fatal' ? 'error' : logLevel](prefix, ...formattedArguments)
        } else {
            console.log(prefix, ...formattedArguments)
        }
    }

    function validateOptions (options, logLevels) {
        if (!(options.logLevel && typeof options.logLevel === 'string' && logLevels.indexOf(options.logLevel) > -1)) {
            return false
        }
        if (options.stringifyArguments && typeof options.stringifyArguments !== 'boolean') {
            return false
        }
        if (options.showLogLevel && typeof options.showLogLevel !== 'boolean') {
            return false
        }
        return true
    }

    function install (Vue, options) {
        if (validateOptions(options, logLevels)) {
            Vue.$log = initLoggerInstance(options, logLevels)
            Vue.prototype.$log = Vue.$log
        } else {
            throw new Error('Provided options for vuejs-logger are not valid.')
        }
    }

    return {
        install,
        validateOptions,
        print,
        initLoggerInstance,
        logLevels
    }
}