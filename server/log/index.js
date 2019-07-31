const StdLogger = require('./stdlogger');
const Config = require('../config');
const LoggerTypes = ['std'];
const LoggerCache = [];

const getLogger = () => {
    let type = Config.get('debug').output;

    if (!~LoggerTypes.indexOf(type)) {
        throw new TypeError(`Cannot get unsupported or invalid logger type [${type}]`);
    }

    let logger = LoggerCache.find(item => item.type === type);
    if (!logger || logger === void 0) {
        logger = new StdLogger(100);
        LoggerCache.push({
            type: type,
            instance: logger
        });

        return logger;
    }

    return logger.instance;
};

module.exports = {

    getLogger: getLogger,

    get logLevels() {
        return require('./loglevels')
    }

};