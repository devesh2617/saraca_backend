"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message); // Call the super constructor (Error class)
        this.statusCode = statusCode; // Custom property to hold the HTTP status code
        this.name = this.constructor.name; // Set the name of the error class
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
}
exports.CustomError = CustomError;
