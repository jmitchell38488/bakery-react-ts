String.prototype.escape = function() {
    return this.replace(/'/g, '\\\'').replace(/"/g,'\\"');
};

process.env.BLUEBIRD_DEBUG = 0;