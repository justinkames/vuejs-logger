# vuejs-logger

> ![](https://travis-ci.org/justinkames/vuejs-logger.svg?branch=master)
    [![codecov](https://codecov.io/gh/justinkames/vuejs-logger/branch/master/graph/badge.svg)](https://codecov.io/gh/justinkames/vuejs-logger)
    [![npm](https://img.shields.io/npm/dt/vuejs-logger.svg)](https://www.npmjs.com/package/vuejs-logger)
    [![npm](https://img.shields.io/npm/dw/vuejs-logger.svg)](https://www.npmjs.com/package/vuejs-logger)
    [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/justinkames/vuejs-logger/master/LICENSE)

> Provides customizable logging functionality for Vue.js. Compatible with Vue2.

## Table of Contents

- [Demo](#demo)
- [Introduction](#introduction)
- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Demo

@ [https://www.webpackbin.com/bins/-KpB0UbGiG2PeFDmqjwi](https://www.webpackbin.com/bins/-KpB0UbGiG2PeFDmqjwi)

## Introduction 

vuejs-logger is a logging library that enables logging for Vue applications. It restricts log messages that are higher than the specified log level. Features include :

- Colored console messages for $log.warning, $log.error and $log.fatal.
- Possibility to automatically JSON.stringify() the (reactive) properties passed to the logger.
- Possibility to display the log level in the console.

```js
logLevels :  ['debug', 'info', 'warn', 'error', 'fatal']
```

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed!

```sh
$ npm install vuejs-logger --save-exact
```

## Usage

Below you can find an example of how to use vuejs-logger :

```js
import VueLogger from 'vuejs-logger'

const options = {
    logLevel : 'debug',
    // optional : defaults to false if not specified
    stringifyArguments : false,
    // optional : defaults to false if not specified
    showLogLevel : false
}

Vue.use(VueLogger, options)
```

```js
new Vue({
    data() {
        return {
            a : 'a',
            b : 'b'
        }
    },
    created() {
        this.$log.debug('test', this.a, 123)
        this.$log.info('test', this.b)
        this.$log.warn('test')
        this.$log.error('test')
        this.$log.fatal('test')
        externalFunction()
    }
})

function externalFunction() {
   // log from external function
   Vue.$log.debug('log from function outside component.') 
}
```

## Maintainers

[@justinkames](https://github.com/justinkames).

## Contribute

Feel free to dive in! [Open an issue](https://github.com/justinkames/vuejs-logger/issues/new) or submit PRs.

vuejs-logger follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

## License

[MIT](LICENSE) © Justin Kames
