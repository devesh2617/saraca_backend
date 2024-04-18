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

const editRegion = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
   const { id } = req.params
   const { name } = req.body
   const regionFound = await prisma.region.findUnique({
      where:{id}
   })
   if(!regionFound){
      const error: any = new Error("Region not found")
      error.status = 404
      return next(error)
   }
   await prisma.region.update({
      where: {id},
      data: {
         name:name
      }
   })
   res.status(201).json({
      message: "Region updated successfully"
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
   let positionCount:any = await prisma.position.count()
   positionCount = positionCount+1
   positionCount = positionCount.toString()
   let jobNo = positionCount.padStart(5, '0')
   const date = new Date()
   let jobId = 'SS'+ date.getFullYear() +jobNo
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
         Region: { connect: { id:foundRegion.id} }
      }
   })
   res.status(201).json({
      message:"Position created successfully"
   })
})

const deletePosition = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
   const { id } = req.params
   
   const foundPosition = await prisma.position.findUnique({ where: { id:id } })
   if (!foundPosition) {
      const error: any = new Error("This position doesn't exist")
      error.status = 404
      return next(error)
   }

   await prisma.position.update({
      where:{id},
      data:{isDeleted:true}
   })
   
   res.status(201).json({
      message:"Position deleted successfully"
   })
})

const editPosition = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
   const { title, description, location, functional, role, desiredSkills, desiredQualification, desiredExperience, region } = req.body
   const {id} = req.params
   const foundRegion = await prisma.region.findUnique({ where: { name: region } })
   if (!foundRegion) {
      const error: any = new Error("Cannot update position as selected region doesn't exist")
      error.status = 404
      return next(error)
   }
   const foundPosition = await prisma.position.findUnique({ where: { id } })
   if (!foundPosition) {
      const error: any = new Error("Position not found")
      error.status = 404
      return next(error)
   }
   await prisma.position.update({
      where: { id },
      data: {
         title,
         description,
         location,
         function: functional,
         role, 
         desiredSkills,
         desiredQualification,
         desiredExperience,
         Region: { connect: { id: foundRegion.id } }
      }
   })
   res.status(200).json({
      message: "Position updated successfully"
   })
})

export { addRegion, addPosition, deletePosition, editPosition, editRegion }