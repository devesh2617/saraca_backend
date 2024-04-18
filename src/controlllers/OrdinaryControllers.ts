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
   
    const positions = await prisma.position.findMany({include:{Region:true}, orderBy:{createdAt:'desc'}, where:{isDeleted:false}})
    res.status(200).json({
       message: "Positions fetched successfully",
       positions: positions
    })
 })

 const getPositionbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
   const {id} = req.params
    const position = await prisma.position.findFirst({
        where:{id},
        include:{Region:true}
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

 const getWhitePaperbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
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

 const getBlogbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const {id} = req.params
     const blog = await prisma.blog.findFirst({
         where:{id}
     })
     if(!blog){
         const error:any = new Error("Blog don't exist")
         error.status = 404
         return next(error)
     }
     res.status(200).json({
        message: "Blog fetched successfully",
        blog: blog
     })
  })

  const getWebinarbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const {id} = req.params
     const webinar = await prisma.webinar.findFirst({
         where:{id}
     })
     if(!webinar){
         const error:any = new Error("Webinar don't exist")
         error.status = 404
         return next(error)
     }
     res.status(200).json({
        message: "Webinar fetched successfully",
        webinar: webinar
     })
  })

  const getNewsbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const {id} = req.params
     const news = await prisma.news.findFirst({
         where:{id}
     })
     if(!news){
         const error:any = new Error("News don't exist")
         error.status = 404
         return next(error)
     }
     res.status(200).json({
        message: "News fetched successfully",
        news: news
     })
  })

  const getCaseStudybyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const {id} = req.params
     const cs = await prisma.caseStudy.findFirst({
         where:{id}
     })
     if(!cs){
         const error:any = new Error("Case Study don't exist")
         error.status = 404
         return next(error)
     }
     res.status(200).json({
        message: "Case Study fetched successfully",
        caseStudy: cs
     })
  })

  const getRegionbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const {id} = req.params
     const region = await prisma.region.findFirst({
         where:{id}
     })
     if(!region){
         const error:any = new Error("Region don't exist")
         error.status = 404
         return next(error)
     }
     res.status(200).json({
        message: "Region fetched successfully",
        region: region
     })
  })


export { getWhitePapers, getBlogs, getNews, getWebinars, getCaseStudies, getRegions, getPositions, getPositionbyId, getWhitePaperbyId, getNewsbyId, getBlogbyId, getCaseStudybyId, getWebinarbyId, getRegionbyId }