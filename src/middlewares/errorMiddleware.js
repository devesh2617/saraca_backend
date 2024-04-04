"use strict";
exports.__esModule = true;
var errorMiddleware = function (err, req, res, next) {
    var customError = new Error("Internal Server Error");
    customError.status = 500;
    var status = err.status || customError.status;
    var message = err.message || customError.message;
    return res.status(status).json({
        message: message
    });
};
exports["default"] = errorMiddleware;
