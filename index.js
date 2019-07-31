process.env.NODE_ENV = process.env.NODE_ENV || 'development';
global.appRoot = require('path').resolve(__dirname);

const
    server = require('./server'),
    logger = server.log.getLogger(),
    startTime = Date.now();

try {
    server
        .init()
        .then(() => {
            let time = Date.now() - startTime;
            logger.info(`Start-up completed in ${time} ms`);
        })
} catch (e) {
    console.error('There was an error during execution');
    console.error(e);
}