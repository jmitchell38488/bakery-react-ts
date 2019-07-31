const
    Helmet = require('koa-helmet'),
    bodyParser = require('koa-bodyparser'),
    cors = require('@koa/cors');

module.exports = {

    get logger() {
        return require('./logger');
    },

    get mime() {
        return require('./mime');
    },

    get xresponse() {
        return require('./xresponse');
    },

    get errorHandler() {
        return require('./errorhandler');
    },

    get headers() {
        return require('./headers');
    },

    get formatResponse() {
        return require('./response')
    },

    get preRequest() {
        return [
            this.errorHandler.handleError,
            this.xresponse, this.mime,
            bodyParser(), Helmet(), cors(),
            this.headers, this.logger
        ];
    },

    get postRequest() {
        return [
            this.formatResponse.json
        ];
    }

};