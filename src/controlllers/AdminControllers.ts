import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
const prisma = new PrismaClient();

const addWhitePaper = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, content, description, date } = req.body

    const wpFound = await prisma.whitePaper.findFirst({
        where: { title }
    })

    if (wpFound) {
        const error: any = new Error("White Paper with same title already exists in the database")
        error.status = 409
        return next(error)
    }
    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path.join(__dirname, `../../public/images/whitePapers/${filename}`)

    fs.promises.copyFile(file.path, filepath)
        .then(async () => {
            await prisma.whitePaper.create({
                data: {
                    title,
                    content,
                    description,
                    date,
                    img: `${process.env.BACKEND_SITE_URL}/images/whitePapers/${filename}`
                }
            })
            res.status(201).json({
                message: "WhitePaper created successfully"
            })
        })
        .catch(() => {
            const error: any = new Error('Error uploading file')
            error.status = 500
            next(error)
        });



})

const addNews = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, description, date, link } = req.body

    const newsFound = await prisma.news.findFirst({
        where: { title }
    })
    if (newsFound) {
        const error: any = new Error("News with same title already exists in the database")
        error.status = 409
        return next(error)
    }

    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path.join(__dirname, `../../public/images/news/${filename}`)

    fs.promises.copyFile(file.path, filepath)
        .then(async () => {
            await prisma.news.create({
                data: {
                    title,
                    link,
                    description,
                    date,
                    img: `${process.env.BACKEND_SITE_URL}/images/news/${filename}`
                }
            })
            res.status(201).json({
                message: "News created successfully"
            })
        })
        .catch(() => {
            const error: any = new Error('Error uploading file')
            error.status = 500
            next(error)
        });

})

const addWebinar = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, link } = req.body

    const webinarFound = await prisma.webinar.findFirst({
        where: { title }
    })
    if (webinarFound) {
        const error: any = new Error("Webinar with same title already exists in the database")
        error.status = 409
        return next(error)
    }

    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path.join(__dirname, `../../public/images/webinars/${filename}`)

    fs.promises.copyFile(file.path, filepath)
        .then(async () => {
            await prisma.webinar.create({
                data: {
                    title,
                    link,
                    img: `${process.env.BACKEND_SITE_URL}/images/webinars/${filename}`
                }
            })
            res.status(201).json({
                message: "Webinar created successfully"
            })
        })
        .catch(() => {
            const error: any = new Error('Error uploading file')
            error.status = 500
            next(error)
        });

})

const addBlog = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, content } = req.body

    const blogFound = await prisma.blog.findFirst({
        where: { title }
    })
    if (blogFound) {
        const error: any = new Error("Blog post with same title already exists in the database")
        error.status = 409
        return next(error)
    }

    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path.join(__dirname, `../../public/images/webinars/${filename}`)

    fs.promises.copyFile(file.path, filepath)
        .then(async () => {
            await prisma.blog.create({
                data: {
                    title,
                    content,
                    img: `${process.env.BACKEND_SITE_URL}/images/blogs/${filename}`
                }
            })
            res.status(201).json({
                message: "Blog post created successfully"
            })
        })
        .catch(() => {
            const error: any = new Error('Error uploading file')
            error.status = 500
            next(error)
        });

})

const getWhitePapers = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const whitePapers = await prisma.whitePaper.findMany()
    res.status(200).json({
        message: "White Papers fetched successfully",
        whitePapers: whitePapers
    })
})

const getNews = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const news = await prisma.news.findMany()
    res.status(200).json({
        message: "News fetched successfully",
        whitePapers: news
    })
})

const getBlogs = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const blogs = await prisma.blog.findMany()
    res.status(200).json({
        message: "Blogs fetched successfully",
        whitePapers: blogs
    })
})

const getWebinars = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const webinars = await prisma.webinar.findMany()
    res.status(200).json({
        message: "Webinars fetched successfully",
        whitePapers: webinars
    })
})



export { addWhitePaper, addNews, addWebinar, addBlog, getWhitePapers, getBlogs, getNews, getWebinars }