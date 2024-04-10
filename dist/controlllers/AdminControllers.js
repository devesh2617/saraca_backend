"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebinars = exports.getNews = exports.getBlogs = exports.getWhitePapers = exports.addBlog = exports.addWebinar = exports.addNews = exports.addWhitePaper = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const addWhitePaper = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, content, description, date } = req.body;
    const wpFound = await prisma.whitePaper.findFirst({
        where: { title }
    });
    if (wpFound) {
        const error = new Error("White Paper with same title already exists in the database");
        error.status = 409;
        return next(error);
    }
    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path_1.default.join(__dirname, `../../public/images/whitePapers/${filename}`);
    fs_1.default.promises.copyFile(file.path, filepath)
        .then(async () => {
        await prisma.whitePaper.create({
            data: {
                title,
                content,
                description,
                date,
                img: `${process.env.BACKEND_SITE_URL}/images/whitePapers/${filename}`
            }
        });
        res.status(201).json({
            message: "WhitePaper created successfully"
        });
    })
        .catch(() => {
        const error = new Error('Error uploading file');
        error.status = 500;
        next(error);
    });
});
exports.addWhitePaper = addWhitePaper;
const addNews = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, description, date, link } = req.body;
    const newsFound = await prisma.news.findFirst({
        where: { title }
    });
    if (newsFound) {
        const error = new Error("News with same title already exists in the database");
        error.status = 409;
        return next(error);
    }
    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path_1.default.join(__dirname, `../../public/images/news/${filename}`);
    fs_1.default.promises.copyFile(file.path, filepath)
        .then(async () => {
        await prisma.news.create({
            data: {
                title,
                link,
                description,
                date,
                img: `${process.env.BACKEND_SITE_URL}/images/news/${filename}`
            }
        });
        res.status(201).json({
            message: "News created successfully"
        });
    })
        .catch(() => {
        const error = new Error('Error uploading file');
        error.status = 500;
        next(error);
    });
});
exports.addNews = addNews;
const addWebinar = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, link } = req.body;
    const webinarFound = await prisma.webinar.findFirst({
        where: { title }
    });
    if (webinarFound) {
        const error = new Error("Webinar with same title already exists in the database");
        error.status = 409;
        return next(error);
    }
    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path_1.default.join(__dirname, `../../public/images/webinars/${filename}`);
    fs_1.default.promises.copyFile(file.path, filepath)
        .then(async () => {
        await prisma.webinar.create({
            data: {
                title,
                link,
                img: `${process.env.BACKEND_SITE_URL}/images/webinars/${filename}`
            }
        });
        res.status(201).json({
            message: "Webinar created successfully"
        });
    })
        .catch(() => {
        const error = new Error('Error uploading file');
        error.status = 500;
        next(error);
    });
});
exports.addWebinar = addWebinar;
const addBlog = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, content } = req.body;
    const blogFound = await prisma.blog.findFirst({
        where: { title }
    });
    if (blogFound) {
        const error = new Error("Blog post with same title already exists in the database");
        error.status = 409;
        return next(error);
    }
    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path_1.default.join(__dirname, `../../public/images/webinars/${filename}`);
    fs_1.default.promises.copyFile(file.path, filepath)
        .then(async () => {
        await prisma.blog.create({
            data: {
                title,
                content,
                img: `${process.env.BACKEND_SITE_URL}/images/blogs/${filename}`
            }
        });
        res.status(201).json({
            message: "Blog post created successfully"
        });
    })
        .catch(() => {
        const error = new Error('Error uploading file');
        error.status = 500;
        next(error);
    });
});
exports.addBlog = addBlog;
const getWhitePapers = (0, express_async_handler_1.default)(async (req, res, next) => {
    const whitePapers = await prisma.whitePaper.findMany();
    res.status(200).json({
        message: "White Papers fetched successfully",
        whitePapers: whitePapers
    });
});
exports.getWhitePapers = getWhitePapers;
const getNews = (0, express_async_handler_1.default)(async (req, res, next) => {
    const news = await prisma.news.findMany();
    res.status(200).json({
        message: "News fetched successfully",
        whitePapers: news
    });
});
exports.getNews = getNews;
const getBlogs = (0, express_async_handler_1.default)(async (req, res, next) => {
    const blogs = await prisma.blog.findMany();
    res.status(200).json({
        message: "Blogs fetched successfully",
        whitePapers: blogs
    });
});
exports.getBlogs = getBlogs;
const getWebinars = (0, express_async_handler_1.default)(async (req, res, next) => {
    const webinars = await prisma.webinar.findMany();
    res.status(200).json({
        message: "Webinars fetched successfully",
        whitePapers: webinars
    });
});
exports.getWebinars = getWebinars;
