class ApiError extends Error {

    constructor(message, status, data) {
        super(message);
        this.statusCode = status;
        this.payload = data || null;
    }

    get data() {
        return this.payload;
    }

    get status() {
        return this.statusCode;
    }

    set status(status) {
        this.statusCode = status;
    }

    set data(payload) {
        return this.payload;
    }
}

module.exports = ApiError;