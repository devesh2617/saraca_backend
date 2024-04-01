"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    const customError = new Error("Internal Server Error");
    customError.status = 500;
    const status = err.status || customError.status;
    const message = err.message || customError.message;
    return res.status(status).json({
        message: message
    });
};
exports.default = errorMiddleware;
