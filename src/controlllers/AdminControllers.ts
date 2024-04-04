import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


const addWhitePaper = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, content, description, img, date } = req.body

    const wpFound = await prisma.whitePaper.findFirst({
        where:{title}
    })
    if(wpFound){
        const error: any = new Error("White Paper with same title already exists in the database")
        error.status = 409
        return next(error)
    }

    await prisma.whitePaper.create({
        data: {
            title,
            content,
            description,
            date,
            img: ""
        }
    })
    res.status(201).json({
        message:"WhitePaper created successfully"
    })
})

const addNews = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, description, img, date, link } = req.body
    
    const newsFound = await prisma.news.findFirst({
        where:{title}
    })
    if(newsFound){
        const error: any = new Error("News post with same title already exists in the database")
        error.status = 409
        return next(error)
    }


    await prisma.news.create({
       data: {
          title,
          link,
          description,
          date,
          img: ""
       }
    })
    res.status(201).json({
       message:"News post created successfully"
    })
 })

 const addWebinar = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, img,  link } = req.body
    
    const webinarFound = await prisma.webinar.findFirst({
        where:{title}
    })
    if(webinarFound){
        const error: any = new Error("Webinar with same title already exists in the database")
        error.status = 409
        return next(error)
    }


    await prisma.webinar.create({
       data: {
          title,
          link,
          img: ""
       }
    })
    res.status(201).json({
       message:"Webinar created successfully"
    })
 })

 const addBlog = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, img,  content } = req.body
    
    const blogFound = await prisma.blog.findFirst({
        where:{title}
    })
    if(blogFound){
        const error: any = new Error("Blog post with same title already exists in the database")
        error.status = 409
        return next(error)
    }


    await prisma.blog.create({
       data: {
          title,
          content,
          img: ""
       }
    })
    res.status(201).json({
       message:"Blog post created successfully"
    })
 })


export { addWhitePaper, addNews, addWebinar, addBlog }