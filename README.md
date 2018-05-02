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

@ [https://codepen.io/justinkames/pen/BwGOVQ](https://codepen.io/justinkames/pen/BwGOVQ)

## Introduction 

vuejs-logger is a logging library that enables logging for Vue applications. It restricts log messages that are higher than the specified log level. Features include :

- Colored console messages for $log.warning, $log.error and $log.fatal.
- Possibility to automatically JSON.stringify() the (reactive) properties passed to the logger.
- Possibility to display the log level in the console.

```js
logLevels :  ['debug', 'info', 'warn', 'error', 'fatal']
```

Option to disable the logger (for using it on PRODUCTION)

```js
isEnabled : false
```


## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed!

https://www.npmjs.com/package/vuejs-logger

```sh
$ npm install vuejs-logger --save-exact
```

## Usage

Below you can find an example of how to use vuejs-logger :

```js
import VueLogger from 'vuejs-logger'

const options = {
    // optional : defaults to true if not specified
    isEnabled: true,
    // required ['debug', 'info', 'warn', 'error', 'fatal']
    logLevel : 'debug',
    // optional : defaults to false if not specified
    stringifyArguments : false,
    // optional : defaults to false if not specified
    showLogLevel : false,
    // optional : defaults to false if not specified
    showMethodName : false,
    // optional : defaults to '|' if not specified
    separator: '|',
    // optional : defaults to false if not specified
    showConsoleColors: false
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

![screen shot 2017-10-17 at 10 54 05](https://user-images.githubusercontent.com/3469323/31655570-910fcbbe-b329-11e7-9738-bece4be4d1a8.png)

## Maintainers

[@justinkames](https://github.com/justinkames).

## Contribute

Feel free to dive in! [Open an issue](https://github.com/justinkames/vuejs-logger/issues/new) or submit PRs.

vuejs-logger follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

## License

[MIT](LICENSE) © Justin Kames
