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

    nconf.file('overrides', path.join(baseConfigPath, 'default.json'));

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
        nconf.file('custom-env', path.join(appRoot, file.replace('./', '').trim()));
    } else {
        nconf.file('custom-env', file);
    }

    nconf.file('defaults', path.join(baseConfigPath, 'default.json'));
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