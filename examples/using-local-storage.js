import Vue from 'vue';
import VueLogger from 'vuejs-logger'

class Logger {
    constructor () {
        this._setStorageDefaultValues();

        const options = {
            isEnabled: this._getIsEnabled(),
            logLevel: this._getlogLevel(),
            stringifyArguments: true,
            showLogLevel: true,
            showMethodName: true,
            separator: '|',
            showConsoleColors: true
        };

        Vue.use(VueLogger, options);
    }

    _setStorageDefaultValues () {
        const isPROD = process.env.NODE_ENV === 'production';

        if (!window.localStorage[this.constants.STORAGE_KEY]) {
            const key = {
                isEnabled: !isPROD,
                logLevel: 'debug'
            };
            localStorage.setItem(this.constants.STORAGE_KEY, JSON.stringify(key));
        }
    }

    _getlogLevel () {
        return this._getStorage().logLevel;
    }

    _getIsEnabled () {
        return this._getStorage().isEnabled;
    }

    _getStorage () {
        return JSON.parse(localStorage.getItem(this.constants.STORAGE_KEY));
    }
}

Logger.prototype.constants = {
    STORAGE_KEY: 'vue-logger'
};

export default Logger;
