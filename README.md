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
- [Properties](#properties)
- [Code example](#code-example)
- [Production tips](#production-tips)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Demo

@ [https://codepen.io/justinkames/pen/BwGOVQ](https://codepen.io/justinkames/pen/BwGOVQ)

## Introduction 

vuejs-logger is a tool that enables configurable logging for Vue applications. Features include :

- Output restriction based on selected loglevel.
- Automatically JSON.stringify() the (reactive) properties passed to the logger.
- Configurable options to customize output for a log messages.
- Colored console messages for $log.warning, $log.error and $log.fatal.

```js
logLevels :  ['debug', 'info', 'warn', 'error', 'fatal']
```


## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). 

https://www.npmjs.com/package/vuejs-logger

```sh
$ npm install vuejs-logger --save-exact
```

## Usage

Below you can find an example of how to use vuejs-logger :

#### Properties

| Name      | Required | Type          | Default     | Description |
| ---       | ---      | ---           | ---         | ---         |
| isEnabled      | false  | Boolean |  true            | Enables the vuejs-logger plugin, useful toggle for production/development. |
| logLevel     | false | String | 'debug'           | Choose between ['debug', 'info', 'warn', 'error', 'fatal']. Read [production tips](#production-tips). |
| stringifyArguments | false | Boolean          | false       | If true, all input will go through JSON.stringify(). Useful when printing reactive properties.|
| showLogLevel  | false | Boolean          | false       | If true, the loglevel will be shown. |
| showMethodName | false | Boolean | false       | If true, the method name of the parent function will be shown in the console. |
| separator | false | String | ' l '       | The seperator between parts of the output ( see [screenshot](#screenshot). |
| showConsoleColors | false | Boolean | false       | If true, enables console.warn, console.fatal, console.error for corresponding loglevels. |

#### Code example

```js
import VueLogger from 'vuejs-logger';
const isProduction = process.env.NODE_ENV === 'production';
 
const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(VueLogger, options);
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
});

function externalFunction() {
   // log from external function
   Vue.$log.debug('log from function outside component.');
}
```


#### Screenshot

![screen shot 2017-10-17 at 10 54 05](https://user-images.githubusercontent.com/3469323/31655570-910fcbbe-b329-11e7-9738-bece4be4d1a8.png)

## Production tips
The plugin can be disabled for production or a lower logLevel can be set to minimize output (as shown in [usage](#usage) ). If the logLevel is set to 'fatal' the plugin will 
ignore all calls with less important loglevels in the code. 

```js
    function foo() {
        // these statements will print nothing if the logLevel is set to 'fatal'. But they will compile just fine. 
        this.$log.debug('test', 'bar')
        this.$log.info('test')
        this.$log.warn('test')
        this.$log.error('test', 'foo')
        // this statement will print if the logLevel is set to 'fatal'
        this.$log.fatal('test', 'bar', 123)
    }
```

## Maintainers

[@justinkames](https://github.com/justinkames).

## Contribute

Feel free to dive in! [Open an issue](https://github.com/justinkames/vuejs-logger/issues/new) or submit PRs.

vuejs-logger follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

## License

[MIT](LICENSE) © Justin Kames
