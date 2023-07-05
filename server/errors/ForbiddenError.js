const HttpError = require("./HttpError");

module.exports = class ForbiddenError extends HttpError {
    constructor() {
        super(403, "Forbidden");
    }
};
