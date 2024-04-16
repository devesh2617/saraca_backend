"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePosition = exports.addPosition = exports.addRegion = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addRegion = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { name } = req.body;
    const regionFound = await prisma.region.findUnique({
        where: { name }
    });
    if (regionFound) {
        const error = new Error("Region already exists in the database");
        error.status = 409;
        return next(error);
    }
    await prisma.region.create({
        data: {
            name,
            Position: { create: [] }
        }
    });
    res.status(201).json({
        message: "Region added successfully"
    });
});
exports.addRegion = addRegion;
const addPosition = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, description, location, functional, role, desiredSkills, desiredQualification, desiredExperience, region } = req.body;
    const foundRegion = await prisma.region.findUnique({ where: { name: region } });
    if (!foundRegion) {
        const error = new Error("Cannot create position as selected region doesn't exist");
        error.status = 404;
        return next(error);
    }
    let positionCount = await prisma.position.count();
    positionCount = positionCount + 1;
    positionCount = positionCount.toString();
    let jobNo = positionCount.padStart(5, '0');
    const date = new Date();
    let jobId = 'SS' + date.getFullYear() + jobNo;
    await prisma.position.create({
        data: {
            title,
            description,
            location,
            function: functional,
            role,
            desiredSkills,
            jobId,
            desiredQualification,
            desiredExperience,
            Region: { connect: { id: foundRegion.id } }
        }
    });
    res.status(201).json({
        message: "Position created successfully"
    });
});
exports.addPosition = addPosition;
const deletePosition = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const foundPosition = await prisma.position.findUnique({ where: { id: id } });
    if (!foundPosition) {
        const error = new Error("This position doesn't exist");
        error.status = 404;
        return next(error);
    }
    await prisma.position.delete({
        where: { id }
    });
    res.status(201).json({
        message: "Position deleted successfully"
    });
});
exports.deletePosition = deletePosition;
