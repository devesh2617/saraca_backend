import { NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()
export default asyncHandler(
    async (req: any, _, next: NextFunction) => {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: { Role: true }
        })
        if (!user) {
            const error: any = new Error("User not found")
            error.status = 401
            return next(error)
        }
        req.email = user.email
        if (user.Role.role === "admin" || user.Role.role === "superuser") {
        return next()
        }
        const error: any = new Error("Only admin can access this")
        error.status = 401
        return next(error)

    }
)