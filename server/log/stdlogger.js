const LogLevels = require('./loglevels');

class StdLogger {

    constructor(minLevel) {
        this.minLevel = minLevel;
        this.enabled = this.minLevel >= LogLevels.info && this.minLevel <= LogLevels.fatal;
    }

    log(severity, message) {
        if (!this.enabled) {
            return;
        }

        switch (severity) {
            case LogLevels.info:
                if (severity >= this.minLevel) console.info(message);
                break;

            case LogLevels.debug:
                if (severity >= this.minLevel) console.debug(message);
                break;

            case LogLevels.warn:
                if (severity >= this.minLevel) console.warn(message);
                break;

            case LogLevels.error:
                if (severity >= this.minLevel) console.exception(message);
                break;

            case LogLevels.fatal:
                if (severity >= this.minLevel) console.error(message);
                break;

            default:
                throw new ReferenceError('Unknown or invalid log severity [' + severity + ']');
        }
    }

    info(message) {
        this.log(LogLevels.info, message);
    }

    debug(message) {
        this.log(LogLevels.debug, message);
    }

    warn(message) {
        this.log(LogLevels.warn, message);
    }

    error(message) {
        this.log(LogLevels.error, message);
    }

    fatal(message) {
        this.log(LogLevels.fatal, message);
    }
}

module.exports = StdLogger;