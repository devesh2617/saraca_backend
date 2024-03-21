"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
exports.default = (0, express_async_handler_1.default)(async (req, _, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        include: { Role: true }
    });
    if (!user) {
        const error = new Error("User not found");
        error.status = 401;
        return next(error);
    }
    req.email = user.email;
    if (user.Role.role !== "superuser") {
        const error = new Error("Only superusers can access this");
        error.status = 401;
        return next(error);
    }
    next();
});
