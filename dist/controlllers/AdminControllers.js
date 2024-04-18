"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCaseStudy = exports.deleteNews = exports.deleteWebinar = exports.deleteBlog = exports.deleteWhitePaper = exports.editCaseStudy = exports.editNews = exports.editWebinar = exports.editBlog = exports.editWhitePaper = exports.addCaseStudy = exports.addBlog = exports.addWebinar = exports.addNews = exports.addWhitePaper = void 0;
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
    const pdfFile = req.files.pdf;
    const pdffilename = Date.now() + "__" + pdfFile.name;
    const pdffilepath = path_1.default.join(__dirname, `../../public/images/whitePapers/pdf/${pdffilename}`);
    const filename = Date.now() + "__" + file.name;
    const filepath = path_1.default.join(__dirname, `../../public/images/whitePapers/img/${filename}`);
    fs_1.default.promises.copyFile(file.path, filepath)
        .then(() => {
        fs_1.default.promises.copyFile(pdfFile.path, pdffilepath).then(async () => {
            await prisma.whitePaper.create({
                data: {
                    title,
                    content,
                    description,
                    date,
                    img: `${process.env.BACKEND_SITE_URL}/images/whitePapers/img/${filename}`,
                    pdf: `${process.env.BACKEND_SITE_URL}/images/whitePapers/pdf/${pdffilename}`
                }
            });
            res.status(201).json({
                message: "WhitePaper created successfully"
            });
        }).catch(() => {
            const error = new Error('Error uploading pdf file');
            error.status = 500;
            return next(error);
        });
    })
        .catch(() => {
        const error = new Error('Error uploading img file');
        error.status = 500;
        return next(error);
    });
});
exports.addWhitePaper = addWhitePaper;
const addCaseStudy = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, project_scope, project_deliverables, key_tools, customer } = req.body;
    const csFound = await prisma.caseStudy.findFirst({
        where: { title }
    });
    if (csFound) {
        const error = new Error("CaseStudy with same title already exists in the database");
        error.status = 409;
        return next(error);
    }
    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path_1.default.join(__dirname, `../../public/images/caseStudies/${filename}`);
    fs_1.default.promises.copyFile(file.path, filepath)
        .then(async () => {
        await prisma.caseStudy.create({
            data: {
                title,
                project_scope,
                project_deliverables,
                key_tools,
                customer,
                img: `${process.env.BACKEND_SITE_URL}/images/caseStudies/${filename}`
            }
        });
        res.status(201).json({
            message: "CaseStudy created successfully"
        });
    })
        .catch(() => {
        const error = new Error('Error uploading file');
        error.status = 500;
        next(error);
    });
});
exports.addCaseStudy = addCaseStudy;
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
    const filepath = path_1.default.join(__dirname, `../../public/images/blogs/${filename}`);
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
const editWhitePaper = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, content, description, date } = req.body;
    const { id } = req.params;
    const wpFound = await prisma.whitePaper.findFirst({
        where: { id }
    });
    if (!wpFound) {
        const error = new Error("White Paper doesn't exist");
        error.status = 404;
        return next(error);
    }
    const file = req.files?.img;
    const pdfFile = req.files?.pdf;
    try {
        if (file) {
            const filename = Date.now() + "__" + file.name;
            const filepath = path_1.default.join(__dirname, `../../public/images/whitePapers/img/${filename}`);
            await fs_1.default.promises.copyFile(file.path, filepath);
            if (wpFound.img) {
                fs_1.default.rmSync(path_1.default.join(__dirname, `../../public/images/whitePapers/img/${wpFound.img.split("/")[wpFound.img.split("/").length - 1]}`));
            }
            await prisma.whitePaper.update({
                where: { id },
                data: {
                    img: `${process.env.BACKEND_SITE_URL}/images/whitePapers/img/${filename}`
                }
            });
        }
        if (pdfFile) {
            const pdffilename = Date.now() + "__" + pdfFile.name;
            const pdffilepath = path_1.default.join(__dirname, `../../public/images/whitePapers/pdf/${pdffilename}`);
            await fs_1.default.promises.copyFile(pdfFile.path, pdffilepath);
            if (wpFound.pdf) {
                fs_1.default.rmSync(path_1.default.join(__dirname, `../../public/images/whitePapers/pdf/${wpFound.pdf.split("/")[wpFound.pdf.split("/").length - 1]}`));
            }
            await prisma.whitePaper.update({
                where: { id },
                data: {
                    pdf: `${process.env.BACKEND_SITE_URL}/images/whitePapers/pdf/${pdffilename}`,
                    title,
                    description,
                    content,
                    date
                }
            });
        }
        res.status(201).json({
            message: "White Paper edited successfully"
        });
    }
    catch (error) {
        console.error(error);
        const err = new Error('Error processing request');
        err.status = 500;
        return next(err);
    }
});
exports.editWhitePaper = editWhitePaper;
const editBlog = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const blogFound = await prisma.blog.findFirst({
        where: { id }
    });
    if (!blogFound) {
        const error = new Error("Blog post doesn't exist");
        error.status = 404;
        return next(error);
    }
    const file = req.files?.img;
    try {
        if (file) {
            const filename = Date.now() + "__" + file.name;
            const filepath = path_1.default.join(__dirname, `../../public/images/blogs/${filename}`);
            await fs_1.default.promises.copyFile(file.path, filepath);
            if (blogFound.img) {
                fs_1.default.rmSync(path_1.default.join(__dirname, `../../public/images/blogs/${blogFound.img.split("/")[blogFound.img.split("/").length - 1]}`));
            }
            await prisma.blog.update({
                where: { id },
                data: {
                    img: `${process.env.BACKEND_SITE_URL}/images/blogs/${filename}`,
                    title,
                    content
                }
            });
        }
        else {
            // If no new image is provided, just update the title and content
            await prisma.blog.update({
                where: { id },
                data: {
                    title,
                    content
                }
            });
        }
        res.status(200).json({
            message: "Blog post edited successfully"
        });
    }
    catch (error) {
        console.error(error);
        const err = new Error('Error processing request');
        err.status = 500;
        return next(err);
    }
});
exports.editBlog = editBlog;
const editWebinar = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, link } = req.body;
    const { id } = req.params;
    const webinarFound = await prisma.webinar.findFirst({
        where: { id }
    });
    if (!webinarFound) {
        const error = new Error("Webinar doesn't exist");
        error.status = 404;
        return next(error);
    }
    const file = req.files?.img;
    try {
        if (file) {
            const filename = Date.now() + "__" + file.name;
            const filepath = path_1.default.join(__dirname, `../../public/images/webinars/${filename}`);
            await fs_1.default.promises.copyFile(file.path, filepath);
            if (webinarFound.img) {
                fs_1.default.rmSync(path_1.default.join(__dirname, `../../public/images/webinars/${webinarFound.img.split("/")[webinarFound.img.split("/").length - 1]}`));
            }
            await prisma.webinar.update({
                where: { id },
                data: {
                    img: `${process.env.BACKEND_SITE_URL}/images/webinars/${filename}`,
                    title,
                    link
                }
            });
        }
        else {
            // If no new image is provided, just update the title and link
            await prisma.webinar.update({
                where: { id },
                data: {
                    title,
                    link
                }
            });
        }
        res.status(200).json({
            message: "Webinar edited successfully"
        });
    }
    catch (error) {
        console.error(error);
        const err = new Error('Error processing request');
        err.status = 500;
        return next(err);
    }
});
exports.editWebinar = editWebinar;
const editNews = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, description, date, link } = req.body;
    const { id } = req.params;
    const newsItemFound = await prisma.news.findFirst({
        where: { id }
    });
    if (!newsItemFound) {
        const error = new Error("News item doesn't exist");
        error.status = 404;
        return next(error);
    }
    const file = req.files?.img;
    try {
        if (file) {
            const filename = Date.now() + "__" + file.name;
            const filepath = path_1.default.join(__dirname, `../../public/images/news/${filename}`);
            await fs_1.default.promises.copyFile(file.path, filepath);
            if (newsItemFound.img) {
                fs_1.default.rmSync(path_1.default.join(__dirname, `../../public/images/news/${newsItemFound.img.split("/")[newsItemFound.img.split("/").length - 1]}`));
            }
            await prisma.news.update({
                where: { id },
                data: {
                    img: `${process.env.BACKEND_SITE_URL}/images/news/${filename}`,
                    title,
                    description,
                    date,
                    link
                }
            });
        }
        else {
            // If no new image is provided, just update the title, description, date, and link
            await prisma.news.update({
                where: { id },
                data: {
                    title,
                    description,
                    date,
                    link
                }
            });
        }
        res.status(200).json({
            message: "News item edited successfully"
        });
    }
    catch (error) {
        console.error(error);
        const err = new Error('Error processing request');
        err.status = 500;
        return next(err);
    }
});
exports.editNews = editNews;
const deleteCaseStudy = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const caseStudyFound = await prisma.caseStudy.findFirst({
        where: { id }
    });
    if (!caseStudyFound) {
        const error = new Error("Case study doesn't exist");
        error.status = 404;
        return next(error);
    }
    await prisma.caseStudy.delete({
        where: { id }
    });
    res.status(200).json({
        message: 'Case study deleted successfully'
    });
});
exports.deleteCaseStudy = deleteCaseStudy;
const deleteWhitePaper = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const whitePaperFound = await prisma.whitePaper.findFirst({
        where: { id }
    });
    if (!whitePaperFound) {
        const error = new Error("White Paper doesn't exist");
        error.status = 404;
        return next(error);
    }
    await prisma.whitePaper.delete({
        where: { id }
    });
    res.status(200).json({
        message: 'White Paper deleted successfully'
    });
});
exports.deleteWhitePaper = deleteWhitePaper;
const deleteBlog = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const blogFound = await prisma.blog.findFirst({
        where: { id }
    });
    if (!blogFound) {
        const error = new Error("Blog doesn't exist");
        error.status = 404;
        return next(error);
    }
    await prisma.blog.delete({
        where: { id }
    });
    res.status(200).json({
        message: 'Blog deleted successfully'
    });
});
exports.deleteBlog = deleteBlog;
const deleteNews = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const newsFound = await prisma.news.findFirst({
        where: { id }
    });
    if (!newsFound) {
        const error = new Error("News doesn't exist");
        error.status = 404;
        return next(error);
    }
    await prisma.news.delete({
        where: { id }
    });
    res.status(200).json({
        message: 'News deleted successfully'
    });
});
exports.deleteNews = deleteNews;
const deleteWebinar = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const webinarFound = await prisma.webinar.findFirst({
        where: { id }
    });
    if (!webinarFound) {
        const error = new Error("Webinar doesn't exist");
        error.status = 404;
        return next(error);
    }
    await prisma.webinar.delete({
        where: { id }
    });
    res.status(200).json({
        message: 'Webinar deleted successfully'
    });
});
exports.deleteWebinar = deleteWebinar;
const editCaseStudy = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, project_scope, project_deliverables, customer, key_tools } = req.body;
    const { id } = req.params;
    const caseStudyFound = await prisma.caseStudy.findFirst({
        where: { id }
    });
    if (!caseStudyFound) {
        const error = new Error("Case study doesn't exist");
        error.status = 404;
        return next(error);
    }
    const file = req.files?.img;
    try {
        if (file) {
            const filename = Date.now() + "__" + file.name;
            const filepath = path_1.default.join(__dirname, `../../public/images/case-studies/${filename}`);
            await fs_1.default.promises.copyFile(file.path, filepath);
            if (caseStudyFound.img) {
                fs_1.default.rmSync(path_1.default.join(__dirname, `../../public/images/case-studies/${caseStudyFound.img.split("/")[caseStudyFound.img.split("/").length - 1]}`));
            }
            await prisma.caseStudy.update({
                where: { id },
                data: {
                    img: `${process.env.BACKEND_SITE_URL}/images/case-studies/${filename}`,
                    title,
                    project_scope,
                    project_deliverables,
                    customer,
                    key_tools
                }
            });
        }
        else {
            // If no new image is provided, just update the other fields
            await prisma.caseStudy.update({
                where: { id },
                data: {
                    title,
                    project_scope,
                    project_deliverables,
                    customer,
                    key_tools
                }
            });
        }
        res.status(200).json({
            message: "Case study edited successfully"
        });
    }
    catch (error) {
        console.error(error);
        const err = new Error('Error processing request');
        err.status = 500;
        return next(err);
    }
});
exports.editCaseStudy = editCaseStudy;
