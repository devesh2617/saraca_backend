import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'

const createUser = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const { name, email, password, role } = req.body
  const userWithSameEmail = await prisma.user.findUnique({ where: { email } })
  if (userWithSameEmail) {
    const error: any = new Error()
    error.message = "User already exists"
    error.status = 400
    return next(error)
  }
  const roleFound = await prisma.role.findUnique({
    where: { role: role }
  })
  if (!roleFound) {
    const error: any = new Error()
    error.message = "Role not found"
    error.status = 400
    return next(error)
  }
  let hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      Role: { connect: { id: roleFound.id } }
    }
  })
  res.status(201).json({
    message: "User created successfully"
  })
}
)

const createRole = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const { role } = req.body;
  const roleFound = await prisma.role.findUnique({ where: { role } })
  if (roleFound) {
    const error: any = new Error("role already exists in the database")
    error.status = 409
    return next(error)
  }

  const roleCreated = await prisma.role.create({
    data: {
      role: role,
      User: { create: [] }
    }, include: { User: true }
  })

  res.status(201).json({
    message: "Role created successfully",
    role: roleCreated
  })
})

const deleteRole = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const { role } = req.body;
  const findRole = await prisma.role.findUnique({
    where: { role }
  })
  if (!findRole) {
    const error: any = new Error("No role found")
    error.status = 404
    return next(error)
  }
  const deletedRole = await prisma.role.delete({
    where: { role }
  })
   res.status(201).json({
    message: "Role deleted successfully"
  })

})

const deleteUser = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const findUser = await prisma.user.findUnique({
    where: { email }
  })
  if (!findUser) {
    const error: any = new Error("No user found")
    error.status = 404
    return next(error)
  }
  const deletedUser = await prisma.user.delete({
    where: { email }
  })
   res.status(201).json({
    message: "User deleted successfully"
  })

})

export { createUser, deleteUser, createRole, deleteRole }