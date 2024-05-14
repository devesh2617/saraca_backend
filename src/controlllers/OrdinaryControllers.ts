import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken"
import path from 'path';
import fs from 'fs';


const prisma = new PrismaClient();
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS,
    },
    tls: {
        // Enable TLS
        ciphers: 'SSLv3',
        rejectUnauthorized: false // Disables certificate validation for testing purposes
    }
});
const getWhitePapersbyIndustry = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const whitePapers = await prisma.whitePaper.findMany({ orderBy: { industry: 'asc' } })
    const industryWiseRecords = {};

    whitePapers.forEach(record => {
        const industry = record.industry;
        if (!industryWiseRecords[industry]) {
            industryWiseRecords[industry] = [];
        }
        industryWiseRecords[industry].push(record);
    });

    res.status(200).json({
        message: "White Papers fetched successfully",
        whitePapers: industryWiseRecords
    })
})

const getWhitePapers = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const whitePapers = await prisma.whitePaper.findMany({ orderBy: { createdAt: 'desc' } })

    res.status(200).json({
        message: "White Papers fetched successfully",
        whitePapers: whitePapers
    })
})

const getNews = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } })
    res.status(200).json({
        message: "News fetched successfully",
        news: news
    })
})

const getBlogs = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } })
    res.status(200).json({
        message: "Blogs fetched successfully",
        blogs: blogs
    })
})

const getWebinars = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const webinars = await prisma.webinar.findMany({ orderBy: { createdAt: 'desc' } })
    res.status(200).json({
        message: "Webinars fetched successfully",
        webinars: webinars
    })
})

const getCaseStudiesbyIndustry = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const caseStudies = await prisma.caseStudy.findMany({ orderBy: { industry: 'asc' } })

    const industryWiseRecords = {};

    caseStudies.forEach(record => {
        const industry = record.industry;
        if (!industryWiseRecords[industry]) {
            industryWiseRecords[industry] = [];
        }
        industryWiseRecords[industry].push(record);
    });
    res.status(200).json({
        message: "Case Studies fetched successfully",
        caseStudies: industryWiseRecords
    })
})

const getCaseStudies = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const caseStudies = await prisma.caseStudy.findMany({ orderBy: { createdAt: 'desc' } })

    res.status(200).json({
        message: "Case Studies fetched successfully",
        caseStudies: caseStudies
    })
})

const getRegions = asyncHandler(async (req: any, res: Response, next: NextFunction) => {

    const regions = await prisma.region.findMany({ include: { Position: false }, orderBy: { createdAt: 'desc' } })
    res.status(201).json({
        message: "Regions fetched succesfully",
        regions: regions
    })
})

const getPositions = asyncHandler(async (req: any, res: Response, next: NextFunction) => {

    const positions = await prisma.position.findMany({ include: { Region: true }, orderBy: { createdAt: 'desc' }, where: { isDeleted: false } })
    res.status(200).json({
        message: "Positions fetched successfully",
        positions: positions
    })
})

const getPositionsbyRegion = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { region_name } = req.params
    const positions = await prisma.position.findMany({ include: { Region: true }, orderBy: { createdAt: 'desc' }, where: { isDeleted: false, Region: { name: region_name } } })
    res.status(200).json({
        message: "Positions fetched successfully",
        positions: positions
    })
})

const getPositionbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    const position = await prisma.position.findFirst({
        where: { id },
        include: { Region: true }
    })
    if (!position) {
        const error: any = new Error("Position don't exist")
        error.status = 404
        return next(error)
    }
    res.status(200).json({
        message: "Position fetched successfully",
        position: position
    })
})

const getWhitePaperbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    const wp = await prisma.whitePaper.findFirst({
        where: { id }
    })
    if (!wp) {
        const error: any = new Error("White paper don't exist")
        error.status = 404
        return next(error)
    }
    res.status(200).json({
        message: "WhitePaper fetched successfully",
        whitePaper: wp
    })
})

const getBlogbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    const blog = await prisma.blog.findFirst({
        where: { id }
    })
    if (!blog) {
        const error: any = new Error("Blog don't exist")
        error.status = 404
        return next(error)
    }
    res.status(200).json({
        message: "Blog fetched successfully",
        blog: blog
    })
})

const getWebinarbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    const webinar = await prisma.webinar.findFirst({
        where: { id }
    })
    if (!webinar) {
        const error: any = new Error("Webinar don't exist")
        error.status = 404
        return next(error)
    }
    res.status(200).json({
        message: "Webinar fetched successfully",
        webinar: webinar
    })
})

const getNewsbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    const news = await prisma.news.findFirst({
        where: { id }
    })
    if (!news) {
        const error: any = new Error("News don't exist")
        error.status = 404
        return next(error)
    }
    res.status(200).json({
        message: "News fetched successfully",
        news: news
    })
})

const getCaseStudybyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    const cs = await prisma.caseStudy.findFirst({
        where: { id }
    })
    if (!cs) {
        const error: any = new Error("Case Study don't exist")
        error.status = 404
        return next(error)
    }
    res.status(200).json({
        message: "Case Study fetched successfully",
        caseStudy: cs
    })
})

const getRegionbyId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    const region = await prisma.region.findFirst({
        where: { id }
    })
    if (!region) {
        const error: any = new Error("Region don't exist")
        error.status = 404
        return next(error)
    }
    res.status(200).json({
        message: "Region fetched successfully",
        region: region
    })
})

const createUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const userWithSameEmail = await prisma.user.findUnique({ where: { email } });
    if (userWithSameEmail) {
        const error: any = new Error();
        error.message = "User already exists";
        error.status = 400;
        return next(error);
    }
    const roleFound = await prisma.role.findUnique({
        where: { role: "ordinary" }
    });
    if (!roleFound) {
        const error: any = new Error();
        error.message = "Role not found";
        error.status = 400;
        return next(error);
    }

    let hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hash,
            Role: { connect: { id: roleFound.id } }
        }
    });


    // Generate an activation link (this is a placeholder, you'll need to implement this)
    const activationLink = `${process.env.FRONTEND_SITE_URL}/activate/${user.id}`;

    // Send the activation email
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Account Activation',
        text: `Hello ${name},\n\nPlease click the following link to activate your account:\n${activationLink}\n\nBest regards,\nYour Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            const error: any = new Error("Error sending mail")
            error.status = 500
            return next(error);
        }
        console.log('Email sent: ' + info.response);
    });
    res.status(201).json({
        message: "Verification link send to your email. Please verify your account."
    });
})

const check_login = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { email, password, positionId } = req.body
    
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) {
        const error: any = new Error("User not found")
        error.status = 404
        return next(error)
    }

    if (!user.isVerified) {
        const error: any = new Error("Please verify your account using verification link")
        error.status = 401
        return next(error)
    }

    const result = await bcrypt.compare(password, user.password)
    if (!result) {
        const error: any = new Error()
        error.status = 401
        error.message = "Password is wrong"
        return next(error)
    }
    const userDetails = await prisma.userDetails.findFirst({
        where:{
            userId: user.id,
            positionId
        }
    })
    if(userDetails?.terms_conditions === true) {
        const error:any =  new Error("You have already applied to this position")
        error.status = 409
        return next(error)
    }
    
    res.status(200).json({
        message: 'Logged in successfully',
        userId: user.id
    })
})

const verify_email = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    const user = await prisma.user.findFirst({ where: { id } })
    if (!user) {
        const error: any = new Error("User not found")
        error.status = 404
        return next(error)
    }

    if (user.isVerified) {
        const error: any = new Error("Already verified")
        error.status = 401
        return next(error)
    }
    await prisma.user.update({ where: { id }, data: { isVerified: true } })
    res.status(200).json({
        message: 'Verified Successfully'
    })

})

const sendWhitePaper = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { name, email, organisationName } = req.body
    const WhitePaper = await prisma.whitePaper.findFirst({
        where: { id }
    })

    if (!WhitePaper) {
        const error: any = new Error("White Paper not found")
        error.status = 404
        return next(error)
    }

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: [email, process.env.USER_EMAIL],
        subject: 'Thank you! for downloading SARACA whitepaper',
        html: `<!DOCTYPE html>
        <html>
        <head>
            <title>SARACA White Paper</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .button {
                    background-color: black; /* Green */
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <p>Hello ${name} ${organisationName ? "(" + organisationName + ")" : ""}</p>
            <p>Thanks for showing interest in our white paper. We appreciate the time you spent on our website. We hope you have liked our website. Please feel free to send any feedback you may have for us. Please find attached the white paper.</p>
            <p>Please feel free to reach out to us at <a href="mailto:contact@saracasolutions.com">contact@saracasolutions.com</a> for any questions you may have.</p>
            <p>Warm Regards,</p>
            <p>Team SARACA</p>
        </body>
        </html>`,
        attachments: [{
            filename: WhitePaper.title,
            path: WhitePaper.pdf
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            const error: any = new Error("Error sending mail")
            error.status = 500;
            return next(error);
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({
            message: 'White Paper sent to your email'
        })
    });

})

const searchFeature = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { query } = req.body
    const news = await prisma.$queryRaw`
    SELECT * 
    FROM "News" 
    WHERE similarity(title, ${query}) > 0.1;
  `;
    const blogs = await prisma.$queryRaw`
    SELECT * 
    FROM "Blog" 
    WHERE similarity(title, ${query}) > 0.1;
  `;
    const caseStudies = await prisma.$queryRaw`
   SELECT * 
   FROM "CaseStudy" 
   WHERE similarity(title, ${query}) > 0.1;
 `;
    const webinars = await prisma.$queryRaw`
   SELECT * 
   FROM "Webinar" 
   WHERE similarity(title, ${query}) > 0.1;
 `;
    const whitePapers = await prisma.$queryRaw`
  SELECT * 
  FROM "WhitePaper" 
  WHERE similarity(title, ${query}) > 0.1;
`;
    res.status(200).json({
        news: news,
        blogs: blogs,
        caseStudies: caseStudies,
        webinars: webinars,
        whitePaper: whitePapers
    })
})

const saveMyInfo = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { positionId, userId, where_did_you_hear_about_us, previously_worked_for_saraca, country, name, address, country_code, mobile_no } = req.body
    const userDetailsFound = await prisma.userDetails.findFirst({
        where: { positionId, userId }
    })
    try {
        
        if (!userDetailsFound) {
            await prisma.userDetails.create({
                data: {
                    where_did_you_hear_about_us,
                    previously_worked_for_saraca,
                    country,
                    name,
                    address,
                    country_code,
                    mobile_no,
                    userId,
                    positionId,
                }
            })
        }
        else {
            await prisma.userDetails.update({
                where: { id:userDetailsFound.id },
                data: { where_did_you_hear_about_us, previously_worked_for_saraca, country, name, address, country_code, mobile_no }
            })

        }
        res.status(201).json({
            message: "Details saved successfully"
        })
    } catch (error) {
        next(error)
    }

})

const saveEducation = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { positionId, userId, school_university, degree, field_of_study, cgpa, skills, linkedin_account, filename } = req.body
    const userDetails = await prisma.userDetails.findFirst({
        where:{
            userId,
            positionId
        }
    })
    if(req?.files?.resume){
        const file = req.files.resume;
   
        const filename = Date.now() + "__" + file.name;
        const filepath = path.join(__dirname, `../../public/resumes/${filename}`)
        
        fs.promises.copyFile(file.path, filepath)
            .then(async () => {
                await prisma.userDetails.update({
                    where: { id: userDetails.id },
                    data: { school_university, degree, field_of_study, cgpa: parseFloat(cgpa), skills, resume: `${process.env.BACKEND_SITE_URL}/resumes/${filename}`, linkedin_account }
                })
                res.status(201).json({
                    message: "Details saved successfully"
                })
            })
            .catch((e) => {
                console.log(e)
                const error: any = new Error('Error uploading file')
                error.status = 500
                return next(error)
            });
    }
    else {
        await prisma.userDetails.update({
            where: { id: userDetails.id },
            data: { school_university, degree, field_of_study, cgpa: parseFloat(cgpa), skills, resume:filename, linkedin_account }
        })
        res.status(201).json({
            message: "Details saved successfully"
        })
    }

})

const saveExperience = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { positionId, userId, relevant_experience,relevant_experience_role_description,total_experience,total_experience_role_description } = req.body
    const userDetails = await prisma.userDetails.findFirst({
        where: { positionId, userId }
    })

    await prisma.userDetails.update({
        where: { id:userDetails.id },
        data: { relevant_experience: parseFloat(relevant_experience),relevant_experience_role_description, total_experience:parseFloat(total_experience), total_experience_role_description }
    })
   
    res.status(201).json({
        message: "Details saved successfully"
    })

})

const saveAgreement = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { positionId, userId, agreement_for_contact, gender } = req.body
    const userDetails = await prisma.userDetails.findFirst({
        where: { positionId, userId }
    })

    await prisma.userDetails.update({
        where: { id: userDetails.id },
        data: { agreement_for_contact, gender }
    })
   
    res.status(201).json({
        message: "Details saved successfully"
    })

})

const saveApplicationForm = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { positionId, userId } = req.body
    const userDetails = await prisma.userDetails.findFirst({
        where: { positionId, userId }
    })

    await prisma.userDetails.update({
        where: { id: userDetails.id },
        data: { terms_conditions: true }
    })
   
    res.status(201).json({
        message: "Application submitted successfully"
    })

})

const getApplicationDetails = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const {positionId, userId} = req.body
    const userDetails = await prisma.userDetails.findFirst({
        where:{
            userId,
            positionId
        }
    })

    if(!userDetails){
        const userDetailsLatest = await prisma.userDetails.findFirst({
            where: {userId, terms_conditions: true},
            orderBy: {updated_at:"desc"}
        })
        res.status(200).json({
            message:"Details fetched successfully",
            userDetails: userDetailsLatest
        }) 
    }
    else res.status(200).json({
        message:"Details fetched successfully",
        userDetails: userDetails
    })
})


export { getWhitePapers, getBlogs, getNews, getWebinars, getCaseStudies, getRegions, getPositions, getPositionbyId, getWhitePaperbyId, getNewsbyId, getBlogbyId, getCaseStudybyId, getWebinarbyId, getRegionbyId, getPositionsbyRegion, createUser, check_login, verify_email, getCaseStudiesbyIndustry, getWhitePapersbyIndustry, sendWhitePaper, searchFeature, saveMyInfo, saveEducation, saveExperience, saveAgreement, getApplicationDetails, saveApplicationForm }