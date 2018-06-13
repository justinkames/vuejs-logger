export default (function () {

    const defaultOptions = {
        isEnabled: true,
        logLevel: 'debug',
        separator: '|',
        stringifyArguments: false,
        showLogLevel: false,
        showMethodName: false,
        showConsoleColors: false,
    }

    const logLevels = ['debug', 'info', 'warn', 'error', 'fatal']

    function initLoggerInstance (options, logLevels) {
        const logger = {}
        logLevels.forEach(logLevel => {
              if (logLevels.indexOf(logLevel) >= logLevels.indexOf(options.logLevel) &&
                  options.isEnabled) {
                  logger[logLevel] = (...args) => {
                      const methodNamePrefix = options.showMethodName ? getMethodName() + ` ${options.separator} ` : ''
                      const logLevelPrefix = options.showLogLevel ? logLevel + ` ${options.separator} ` : ''
                      const formattedArguments = options.stringifyArguments ? args.map(a => JSON.stringify(a)) : args
                      print(logLevel, logLevelPrefix, methodNamePrefix, formattedArguments, options.showConsoleColors)
                  }
              }
              else {
                  logger[logLevel] = () => {}
              }
          }
        )
        return logger
    }

    function print (logLevel = false, logLevelPrefix = false, methodNamePrefix = false, formattedArguments = false, showConsoleColors = false) {
        let arguments = [];
        if(logLevelPrefix !== '') {
            arguments.push(logLevelPrefix);
        }
        if(methodNamePrefix !== '') {
            arguments.push(methodNamePrefix);
        }
        arguments = [...arguments, ...formattedArguments];
        if (showConsoleColors && (logLevel === 'warn' || logLevel === 'error' || logLevel === 'fatal')) {
            console[logLevel === 'fatal' ? 'error' : logLevel](...arguments)
        } else {
            console.log(...arguments)
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
        if (options.showConsoleColors && typeof options.showConsoleColors !== 'boolean') {
            return false
        }
        if (options.separator && (typeof options.separator !== 'string' || (typeof options.separator === 'string' && options.separator.length > 3))) {
            return false
        }
        if (typeof options.isEnabled !== 'boolean') {
            return false
        }
        return !(options.showMethodName && typeof options.showMethodName !== 'boolean')
    }

    function install (Vue, options) {
        options = Object.assign(defaultOptions, options)

        if (isValidOptions(options, logLevels)) {
            Vue.$log = initLoggerInstance(options, logLevels)
            Vue.prototype.$log = Vue.$log
        } else {
            throw new Error('Provided options for vuejs-logger are not valid.')
        }
    }

    function getMethodName () {
        let error = {}
        try { throw new Error('') } catch (e) { error = e }
        // IE9 does not have .stack property
        if (error.stack === undefined) {
            return ''
        }
        let stackTrace = error.stack.split('\n')[3]
        if (/ /.test(stackTrace)) {
            stackTrace = stackTrace.trim().split(' ')[1]
        }
        if (stackTrace && stackTrace.includes('.')) {
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
})()
