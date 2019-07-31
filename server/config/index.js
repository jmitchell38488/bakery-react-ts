const
    NConf = require('nconf'),
    path = require('path'),
    env = process.env.NODE_ENV;

let ConfigInstance;

const loadConfig = (options) => {
    options = options || {};

    const
        baseConfigPath = options.baseConfigPath || __dirname,
        nconf = new NConf.Provider();

    nconf.use('file', {file: path.join(baseConfigPath, 'default.json')});

    nconf.argv();
    nconf.env({
        separator: '__',
        parseValues: true
    });

    // No NODE_CONFIG path passed to the application
    if (!(!!process.env.NODE_CONFIG)) {
        throw new ReferenceError('Cannot load config file, no valid NODE_CONFIG file path provided');
    }

    let file = process.env.NODE_CONFIG, char = file.substr(0, 1);

    // relative path
    if (char !== '/') {
        file = path.join(appRoot, file.replace('./', '').trim());
    }

    nconf.use('file', {file: file});

    nconf.set('env', env);

    return nconf;
};

class ConfigManager {

    constructor() {
        this.nconf = loadConfig();
    }

    set(config) {
        // Not implemented
    }

    get(config, def) {
        return this.nconf.get(config) || def;
    }

}

if (!(!!ConfigInstance)) {
    ConfigInstance = new ConfigManager();
}

module.exports = ConfigInstance;