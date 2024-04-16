import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getWhitePapers = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const whitePapers = await prisma.whitePaper.findMany({orderBy:{createdAt:'desc'}})
    res.status(200).json({
        message: "White Papers fetched successfully",
        whitePapers: whitePapers
    })
})

const getNews = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const news = await prisma.news.findMany({orderBy:{createdAt:'desc'}})
    res.status(200).json({
        message: "News fetched successfully",
        news: news
    })
})

const getBlogs = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const blogs = await prisma.blog.findMany({orderBy:{createdAt:'desc'}})
    res.status(200).json({
        message: "Blogs fetched successfully",
        blogs: blogs
    })
})

const getWebinars = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const webinars = await prisma.webinar.findMany({orderBy:{createdAt:'desc'}})
    res.status(200).json({
        message: "Webinars fetched successfully",
        webinars: webinars
    })
})

const getCaseStudies = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const caseStudies = await prisma.caseStudy.findMany({orderBy:{createdAt:'desc'}})
    res.status(200).json({
        message: "Case Studies fetched successfully",
        caseStudies: caseStudies
    })
})

const getRegions = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
   
    const regions = await prisma.region.findMany({include:{Position:false}, orderBy:{createdAt:'desc'}})
    res.status(201).json({
       message: "Regions fetched succesfully",
       regions: regions
    })
 })

 const getPositions = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
   
    const positions = await prisma.position.findMany({include:{Region:false}, orderBy:{createdAt:'desc'}})
    res.status(200).json({
       message: "Positions fetched successfully",
       positions: positions
    })
 })

 const getPosition = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
   const {id} = req.params
    const position = await prisma.position.findFirst({
        where:{id}
    })
    if(!position){
        const error:any = new Error("Position don't exist")
        error.status = 404
        return next(error)
    }
    res.status(200).json({
       message: "Position fetched successfully",
       position: position
    })
 })

 const getWhitePaper = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
   const {id} = req.params
    const wp = await prisma.whitePaper.findFirst({
        where:{id}
    })
    if(!wp){
        const error:any = new Error("White paper don't exist")
        error.status = 404
        return next(error)
    }
    res.status(200).json({
       message: "WhitePaper fetched successfully",
       whitePaper: wp
    })
 })

export { getWhitePapers, getBlogs, getNews, getWebinars, getCaseStudies, getRegions, getPositions, getPosition, getWhitePaper }