import express, { NextFunction, Request, Response } from 'express'
import nodemailer from 'nodemailer'
const app = express();
import path from 'path';
import dotenv from 'dotenv';
import expressFormData from 'express-form-data';
import cors from 'cors';
import asyncHandler from 'express-async-handler';
import errorMiddleware from './middlewares/errorMiddleware';
import SuperUserRouter from './routers/SuperUserRouter';
import AdminRouter from './routers/AdminRouter'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import superUserMiddleware from './middlewares/superUserMiddleware';
import TAadminMiddleware from './middlewares/TAadminMiddleware';
import TAadminRouter from "./routers/TAadminRouter";
import adminMiddleware from './middlewares/adminMiddleware';
import OrdinaryRouter from './routers/OrdinaryRouter';
const prisma = new PrismaClient();

dotenv.config()
// app.locals.cookieOptions = {
//   httpOnly: true,
//   secure: false,
//   domain: process.env.FRONTEND_SITE_URL
// }
const PORT = 5000;
const corsOptions = {
  origin: process.env.FRONTEND_SITE_URL, // Allow requests from this origin
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
};
const styledText = '\x1b[33;4m'; // 33 is for yellow color, 4 is for underline
const resetFormatting = '\x1b[0m';
// app.use(cookieParser())
app.use(expressFormData.parse({
  maxFileSize: 100 * 1024 * 1024, // 100MB limit
  autoClean: true // Automatically clean uploaded files
}))
app.use(expressFormData.union())

app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, '../public')))
app.listen(PORT, () => {
  console.log(`${styledText}Server is running ${PORT}${resetFormatting}`);
})

app.use(errorMiddleware)

app.post("/login", asyncHandler(async (req: any, res: Response, next: NextFunction) => {

  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email:email.toLowerCase() },
    include: { Role: true }
  })

  if (!user) {
    const error: any = new Error()
    error.status = 401
    error.message = "No user found with the email"
    return next(error)
  }
  if (user.Role.role !== 'superuser' && user.Role.role  !== "admin" && user.Role.role !== "TAadmin") {
    const error: any = new Error()
    error.status = 401
    error.message = "Unauthorised"
    return next(error)
  }
  const result = await bcrypt.compare(password, user.password)
  if (!result) {
    const error: any = new Error()
    error.status = 401
    error.message = "Password is wrong"
    return next(error)
  }

  const payload = {
    id: user.id
  }
  const expiresIn = '24h'
  const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn })
  res.status(200).json({
    message: 'Logged in successfully',
    role: user.Role.role,
    token
  })
}))

app.get('/check_user', asyncHandler(async (req: any, res: Response, next:NextFunction) => {
   
    const token = req?.headers?.authorization?.split(" ")[1]
        if(!token){
            const error:any = new Error("unauthorized")
            error.status = 401
            return next(error)
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include:{Role:true}
        })
        if (!user) {
            const error: any = new Error("User not found")
            error.status = 401
            return next(error)
        }
        res.status(200).json({
          valid: true,
          role:user.Role.role
        })
        
}))

app.use('/superuser', superUserMiddleware, SuperUserRouter)
app.use('/TAadmin', TAadminMiddleware, TAadminRouter)
app.use('/admin', adminMiddleware, AdminRouter)
app.use('/api', OrdinaryRouter)
app.post('/contact_us', asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, country_code, organisation, mobile_no, country, industry, message } = req.body
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS,
      },
    
    });
    transporter.sendMail({
      from: `"SARACA Website" <${process.env.USER_EMAIL}>`, // sender address
      to: [email, process.env.CONTACT_SARACA_EMAIL], // list of receivers
      subject: "Contact Us mail from SARACA Website", // Subject line
      html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Us Email</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              margin: 0;
              padding: 20px;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              background-color: #fff;
              border-radius: 5px;
            }
            th, td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
            }
            .highlight {
              background-color: #f7e6ff; /* Light purple */
            }
          </style>
        </head>
        <body>
          <table>
            <tr class="highlight">
              <th colspan="2">Contact Information</th>
            </tr>
            <tr>
              <td><strong>Name:</strong></td>
              <td>${name}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${email}</td>
            </tr>
            <tr>
              <td><strong>Organisation:</strong></td>
              <td>${organisation}</td>
            </tr>
            <tr>
              <td><strong>Mobile No:</strong></td>
              <td>${country_code} ${mobile_no}</td>
            </tr>
            <tr>
              <td><strong>Country:</strong></td>
              <td>${country}</td>
            </tr>
            <tr>
              <td><strong>Industry:</strong></td>
              <td>${industry}</td>
            </tr>
            <tr>
              <td><strong>Message:</strong></td>
              <td>${message}</td>
            </tr>
          </table>
        </body>
        </html>
        `, // html body
    }, (err: any, info: any) => {
      if (err) {
        next(err)
      }
      return res.status(200).json({
        message: "Email Sent Successfully",
        messageId: info.messageId
      })

    });

  }
))

