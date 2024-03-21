"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
exports.default = (0, express_async_handler_1.default)(async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        include: { Role: true }
    });
    console.log(user);
    if (!user) {
        const error = new Error();
        error.message = "User not found";
        error.status = 401;
        return next(error);
    }
    req.email = user.email;
    req.role = user.Role.role;
    next();
});
