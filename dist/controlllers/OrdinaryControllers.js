"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegionbyId = exports.getWebinarbyId = exports.getCaseStudybyId = exports.getBlogbyId = exports.getNewsbyId = exports.getWhitePaperbyId = exports.getPositionbyId = exports.getPositions = exports.getRegions = exports.getCaseStudies = exports.getWebinars = exports.getNews = exports.getBlogs = exports.getWhitePapers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getWhitePapers = (0, express_async_handler_1.default)(async (req, res, next) => {
    const whitePapers = await prisma.whitePaper.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({
        message: "White Papers fetched successfully",
        whitePapers: whitePapers
    });
});
exports.getWhitePapers = getWhitePapers;
const getNews = (0, express_async_handler_1.default)(async (req, res, next) => {
    const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({
        message: "News fetched successfully",
        news: news
    });
});
exports.getNews = getNews;
const getBlogs = (0, express_async_handler_1.default)(async (req, res, next) => {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({
        message: "Blogs fetched successfully",
        blogs: blogs
    });
});
exports.getBlogs = getBlogs;
const getWebinars = (0, express_async_handler_1.default)(async (req, res, next) => {
    const webinars = await prisma.webinar.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({
        message: "Webinars fetched successfully",
        webinars: webinars
    });
});
exports.getWebinars = getWebinars;
const getCaseStudies = (0, express_async_handler_1.default)(async (req, res, next) => {
    const caseStudies = await prisma.caseStudy.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({
        message: "Case Studies fetched successfully",
        caseStudies: caseStudies
    });
});
exports.getCaseStudies = getCaseStudies;
const getRegions = (0, express_async_handler_1.default)(async (req, res, next) => {
    const regions = await prisma.region.findMany({ include: { Position: false }, orderBy: { createdAt: 'desc' } });
    res.status(201).json({
        message: "Regions fetched succesfully",
        regions: regions
    });
});
exports.getRegions = getRegions;
const getPositions = (0, express_async_handler_1.default)(async (req, res, next) => {
    const positions = await prisma.position.findMany({ include: { Region: true }, orderBy: { createdAt: 'desc' }, where: { isDeleted: false } });
    res.status(200).json({
        message: "Positions fetched successfully",
        positions: positions
    });
});
exports.getPositions = getPositions;
const getPositionbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const position = await prisma.position.findFirst({
        where: { id },
        include: { Region: true }
    });
    if (!position) {
        const error = new Error("Position don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "Position fetched successfully",
        position: position
    });
});
exports.getPositionbyId = getPositionbyId;
const getWhitePaperbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const wp = await prisma.whitePaper.findFirst({
        where: { id }
    });
    if (!wp) {
        const error = new Error("White paper don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "WhitePaper fetched successfully",
        whitePaper: wp
    });
});
exports.getWhitePaperbyId = getWhitePaperbyId;
const getBlogbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const blog = await prisma.blog.findFirst({
        where: { id }
    });
    if (!blog) {
        const error = new Error("Blog don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "Blog fetched successfully",
        blog: blog
    });
});
exports.getBlogbyId = getBlogbyId;
const getWebinarbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const webinar = await prisma.webinar.findFirst({
        where: { id }
    });
    if (!webinar) {
        const error = new Error("Webinar don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "Webinar fetched successfully",
        webinar: webinar
    });
});
exports.getWebinarbyId = getWebinarbyId;
const getNewsbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const news = await prisma.news.findFirst({
        where: { id }
    });
    if (!news) {
        const error = new Error("News don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "News fetched successfully",
        news: news
    });
});
exports.getNewsbyId = getNewsbyId;
const getCaseStudybyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const cs = await prisma.caseStudy.findFirst({
        where: { id }
    });
    if (!cs) {
        const error = new Error("Case Study don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "Case Study fetched successfully",
        caseStudy: cs
    });
});
exports.getCaseStudybyId = getCaseStudybyId;
const getRegionbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const region = await prisma.region.findFirst({
        where: { id }
    });
    if (!region) {
        const error = new Error("Region don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "Region fetched successfully",
        region: region
    });
});
exports.getRegionbyId = getRegionbyId;
