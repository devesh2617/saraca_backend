"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.createRole = exports.createUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUsers = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const userWithSameEmail = await prisma.user.findUnique({ where: { email } });
    if (userWithSameEmail) {
        const error = new Error();
        error.message = "User already exists";
        error.status = 400;
        return next(error);
    }
    const roleFound = await prisma.role.findUnique({
        where: { role: role }
    });
    if (!roleFound) {
        const error = new Error();
        error.message = "Role not found";
        error.status = 400;
        return next(error);
    }
    let hash = await bcrypt_1.default.hash(password, 10);
    const user = await prisma.user.create({ data: {
            name,
            email,
            password: hash,
            Role: { connect: { id: roleFound.id } }
        } });
    res.status(201).json({
        message: "User created successfully"
    });
});
exports.createUsers = createUsers;
const createRole = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { role } = req.body;
    const roleFound = await prisma.role.findUnique({ where: { role } });
    if (roleFound) {
        const error = new Error("role already exists in the database");
        error.status = 409;
        return next(error);
    }
    const roleCreated = await prisma.role.create({ data: {
            role: role,
            User: { create: [] }
        }, include: { User: true } });
    res.status(201).json({
        message: "Role created successfully",
        role: roleCreated
    });
});
exports.createRole = createRole;
const deleteRole = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { role } = req.body;
    const findRole = await prisma.role.findUnique({
        where: { role }
    });
    if (!findRole) {
        const error = new Error("No role found");
        error.status = 404;
        return next(error);
    }
    const deletedRole = await prisma.role.delete({
        where: { role }
    });
    res.status(204).json({
        message: "Role deleted successfully",
        deleteRole: deleteRole
    });
});
exports.deleteRole = deleteRole;
