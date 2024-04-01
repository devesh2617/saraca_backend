import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const addRegion = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
   const { name } = req.body
   const regionFound = await prisma.region.findUnique({
      where:{name}
   })
   if(regionFound){
      const error: any = new Error("Region already exists in the database")
      error.status = 409
      return next(error)
   }
   await prisma.region.create({
      data: {
         name,
         Position: { create: [] }
      }
   })
   res.status(201).json({
      message: "Region added successfully"
   })
})

const getRegions = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
   const regions = await prisma.region.findMany({include:{Position:false}})
   res.status(201).json({
      message: "Region added successfully",
      regions: regions
   })
})

const addPosition = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
   const { title, description, location, functional, role, desiredSkills, desiredQualification, desiredExperience, region } = req.body
   const foundRegion = await prisma.region.findUnique({ where: { name: region } })
   if (!foundRegion) {
      const error: any = new Error("Cannot create position as selected region doesn't exist")
      error.status = 404
      return next(error)
   }
   const positionCount = await prisma.position.count()
   console.log(typeof positionCount)
   await prisma.position.create({
      data: {
         title,
         description,
         location,
         function: functional,
         role, 
         desiredSkills,
         desiredQualification,
         desiredExperience,
         Region: { connect: { id:foundRegion.id} }
      }
   })
   res.status(201).json({
      message:"Position created successfully"
   })
})

export { addRegion, addPosition, getRegions }