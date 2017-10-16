export default (function () {

    const logLevels = ['debug', 'info', 'warn', 'error', 'fatal']

    function initLoggerInstance (options, logLevels) {
        const logger = {}
        logLevels.forEach(logLevel => {
              if (logLevels.indexOf(logLevel) >= logLevels.indexOf(options.logLevel)) {
                  logger[logLevel] = (...args) => {
                      let methodName = getMethodName()
                      const methodNamePrefix = options.showMethodName ? methodName + ' | ' : ''
                      const logLevelPrefix = options.showLogLevel ? logLevel + ' | ' : ''
                      const formattedArguments = options.stringifyArguments ? args.map(a => JSON.stringify(a)) : args
                      print(logLevel, logLevelPrefix, methodNamePrefix, formattedArguments)
                  }
              }
              else {
                  logger[logLevel] = () => {}
              }
          }
        )
        return logger
    }

    function print (logLevel = false, logLevelPrefix = false, methodNamePrefix = false, formattedArguments = false) {
        if (logLevel === 'warn' || logLevel === 'error' || logLevel === 'fatal') {
            console[logLevel === 'fatal' ? 'error' : logLevel](logLevelPrefix, methodNamePrefix, ...formattedArguments)
        } else {
            console.log(logLevelPrefix, methodNamePrefix, ...formattedArguments)
        }
    }

    function isValidOptions (options, logLevels) {
        if (!(options.logLevel && typeof options.logLevel === 'string' && logLevels.indexOf(options.logLevel) > -1)) {
            return false
        }
        if (options.stringifyArguments && typeof options.stringifyArguments !== 'boolean') {
            return false
        }
        if (options.showLogLevel && typeof options.showLogLevel !== 'boolean') {
            return false
        }
        return !(options.showMethodName && typeof options.showMethodName !== 'boolean')
    }

    function install (Vue, options) {
        if (isValidOptions(options, logLevels)) {
            Vue.$log = initLoggerInstance(options, logLevels)
            Vue.prototype.$log = Vue.$log
        } else {
            throw new Error('Provided options for vuejs-logger are not valid.')
        }
    }

    function getMethodName () {
        let stackTrace = Error().stack.split('\n')[3]
        if (/ /.test(stackTrace)) {
            stackTrace = stackTrace.trim().split(' ')[1]
        }
        if (stackTrace.includes('.')) {
            stackTrace = stackTrace.split('.')[1]
        }
        return stackTrace
    }

    return {
        install,
        isValidOptions,
        print,
        initLoggerInstance,
        logLevels
    }
})
()