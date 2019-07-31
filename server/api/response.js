class ApiResponse {

    constructor(status = 200) {
        this.responseData = {
            status: status,
            message: null,
            data: null
        };
    }

    set status(status) {
        this.responseData.status = status;
    }

    set message(message) {
        this.responseData.message = message;
    }

    set data(data) {
        this.responseData.data = data;
    }

    get status() {
        return this.responseData.status;
    }

    get json() {
        let response = {
            status: this.responseData.status
        };

        if (this.responseData.message !== null) {
            response.message = this.responseData.message;
        }

        if (this.responseData.data !== void 0 && Array.isArray(this.responseData.data)) {
            response = Object.assign({}, response, {
                list: this.responseData.data,
                count: this.responseData.data.length
            });
        } else if (this.responseData.data !== void 0) {
            response.data = this.responseData.data;
        }

        return response;
    }
}

module.exports = ApiResponse;