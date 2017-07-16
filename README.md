# vuejs-logger
![](https://travis-ci.org/justinkames/vuejs-logger.svg?branch=master)
[![codecov](https://codecov.io/gh/justinkames/vuejs-logger/branch/master/graph/badge.svg)](https://codecov.io/gh/justinkames/vuejs-logger)

> Provides customizable logging functionality for Vue.js. Compatible with Vue2.

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)


## Introduction 

vuejs-logger is a logging library that enables logging for Vue applications. It restricts log messages that are higher the specified log level. Features include :

- Colored console messages for $log.warning, $log.error and $log.fatal.
- Possibility to automatically JSON.stringify() the properties passed to the logger.
- Possibility to display the log level in the console.

```js
logLevels :  ['debug', 'info', 'warn', 'error', 'fatal']
```
## Demo

@ [https://www.webpackbin.com/bins/-KpB0UbGiG2PeFDmqjwi](https://www.webpackbin.com/bins/-KpB0UbGiG2PeFDmqjwi)

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
    }
})
```

## Maintainers

[@justinkames](https://github.com/justinkames).

## Contribute

Feel free to dive in! [Open an issue]() or submit PRs.

vuejs-logger follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

## License

[MIT](LICENSE) © Justin Kames
