"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveApplicationForm = exports.getApplicationDetails = exports.saveAgreement = exports.saveExperience = exports.saveEducation = exports.saveMyInfo = exports.searchFeature = exports.sendWhitePaper = exports.getWhitePapersbyIndustry = exports.getCaseStudiesbyIndustry = exports.verify_email = exports.check_login = exports.createUser = exports.getPositionsbyRegion = exports.getRegionbyId = exports.getWebinarbyId = exports.getCaseStudybyId = exports.getBlogbyId = exports.getNewsbyId = exports.getWhitePaperbyId = exports.getPositionbyId = exports.getPositions = exports.getRegions = exports.getCaseStudies = exports.getWebinars = exports.getNews = exports.getBlogs = exports.getWhitePapers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const transporter = nodemailer_1.default.createTransport({
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
const getWhitePapersbyIndustry = (0, express_async_handler_1.default)(async (req, res, next) => {
    const whitePapers = await prisma.whitePaper.findMany({ orderBy: { industry: 'asc' } });
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
    });
});
exports.getWhitePapersbyIndustry = getWhitePapersbyIndustry;
const getWhitePapers = (0, express_async_handler_1.default)(async (req, res, next) => {
    const whitePapers = await prisma.whitePaper.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({
        message: "White Papers fetched successfully",
        whitePapers: whitePapers
    });
});
exports.getWhitePapers = getWhitePapers;
const getNews = (0, express_async_handler_1.default)(async (req, res, next) => {
    const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({
        message: "News fetched successfully",
        news: news
    });
});
exports.getNews = getNews;
const getBlogs = (0, express_async_handler_1.default)(async (req, res, next) => {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({
        message: "Blogs fetched successfully",
        blogs: blogs
    });
});
exports.getBlogs = getBlogs;
const getWebinars = (0, express_async_handler_1.default)(async (req, res, next) => {
    const webinars = await prisma.webinar.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({
        message: "Webinars fetched successfully",
        webinars: webinars
    });
});
exports.getWebinars = getWebinars;
const getCaseStudiesbyIndustry = (0, express_async_handler_1.default)(async (req, res, next) => {
    const caseStudies = await prisma.caseStudy.findMany({ orderBy: { industry: 'asc' } });
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
    });
});
exports.getCaseStudiesbyIndustry = getCaseStudiesbyIndustry;
const getCaseStudies = (0, express_async_handler_1.default)(async (req, res, next) => {
    const caseStudies = await prisma.caseStudy.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({
        message: "Case Studies fetched successfully",
        caseStudies: caseStudies
    });
});
exports.getCaseStudies = getCaseStudies;
const getRegions = (0, express_async_handler_1.default)(async (req, res, next) => {
    const regions = await prisma.region.findMany({ include: { Position: false }, orderBy: { createdAt: 'desc' } });
    res.status(201).json({
        message: "Regions fetched succesfully",
        regions: regions
    });
});
exports.getRegions = getRegions;
const getPositions = (0, express_async_handler_1.default)(async (req, res, next) => {
    const positions = await prisma.position.findMany({ include: { Region: true }, orderBy: { createdAt: 'desc' }, where: { isDeleted: false } });
    res.status(200).json({
        message: "Positions fetched successfully",
        positions: positions
    });
});
exports.getPositions = getPositions;
const getPositionsbyRegion = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { region_name } = req.params;
    const positions = await prisma.position.findMany({ include: { Region: true }, orderBy: { createdAt: 'desc' }, where: { isDeleted: false, Region: { name: region_name } } });
    res.status(200).json({
        message: "Positions fetched successfully",
        positions: positions
    });
});
exports.getPositionsbyRegion = getPositionsbyRegion;
const getPositionbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const position = await prisma.position.findFirst({
        where: { id },
        include: { Region: true }
    });
    if (!position) {
        const error = new Error("Position don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "Position fetched successfully",
        position: position
    });
});
exports.getPositionbyId = getPositionbyId;
const getWhitePaperbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const wp = await prisma.whitePaper.findFirst({
        where: { id }
    });
    if (!wp) {
        const error = new Error("White paper don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "WhitePaper fetched successfully",
        whitePaper: wp
    });
});
exports.getWhitePaperbyId = getWhitePaperbyId;
const getBlogbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const blog = await prisma.blog.findFirst({
        where: { id }
    });
    if (!blog) {
        const error = new Error("Blog don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "Blog fetched successfully",
        blog: blog
    });
});
exports.getBlogbyId = getBlogbyId;
const getWebinarbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const webinar = await prisma.webinar.findFirst({
        where: { id }
    });
    if (!webinar) {
        const error = new Error("Webinar don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "Webinar fetched successfully",
        webinar: webinar
    });
});
exports.getWebinarbyId = getWebinarbyId;
const getNewsbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const news = await prisma.news.findFirst({
        where: { id }
    });
    if (!news) {
        const error = new Error("News don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "News fetched successfully",
        news: news
    });
});
exports.getNewsbyId = getNewsbyId;
const getCaseStudybyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const cs = await prisma.caseStudy.findFirst({
        where: { id }
    });
    if (!cs) {
        const error = new Error("Case Study don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "Case Study fetched successfully",
        caseStudy: cs
    });
});
exports.getCaseStudybyId = getCaseStudybyId;
const getRegionbyId = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const region = await prisma.region.findFirst({
        where: { id }
    });
    if (!region) {
        const error = new Error("Region don't exist");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        message: "Region fetched successfully",
        region: region
    });
});
exports.getRegionbyId = getRegionbyId;
const createUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { name, email, password } = req.body;
    const userWithSameEmail = await prisma.user.findUnique({ where: { email } });
    if (userWithSameEmail) {
        const error = new Error();
        error.message = "User already exists";
        error.status = 400;
        return next(error);
    }
    const roleFound = await prisma.role.findUnique({
        where: { role: "ordinary" }
    });
    if (!roleFound) {
        const error = new Error();
        error.message = "Role not found";
        error.status = 400;
        return next(error);
    }
    let hash = await bcrypt_1.default.hash(password, 10);
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
            const error = new Error("Error sending mail");
            error.status = 500;
            return next(error);
        }
        console.log('Email sent: ' + info.response);
    });
    res.status(201).json({
        message: "Verification link send to your email. Please verify your account."
    });
});
exports.createUser = createUser;
const check_login = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email, password, positionId } = req.body;
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
    }
    if (!user.isVerified) {
        const error = new Error("Please verify your account using verification link");
        error.status = 401;
        return next(error);
    }
    const result = await bcrypt_1.default.compare(password, user.password);
    if (!result) {
        const error = new Error();
        error.status = 401;
        error.message = "Password is wrong";
        return next(error);
    }
    const userDetails = await prisma.userDetails.findFirst({
        where: {
            userId: user.id,
            positionId
        }
    });
    if (userDetails?.terms_conditions === true) {
        const error = new Error("You have already applied to this position");
        error.status = 409;
        return next(error);
    }
    res.status(200).json({
        message: 'Logged in successfully',
        userId: user.id
    });
});
exports.check_login = check_login;
const verify_email = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
    }
    if (user.isVerified) {
        const error = new Error("Already verified");
        error.status = 401;
        return next(error);
    }
    await prisma.user.update({ where: { id }, data: { isVerified: true } });
    res.status(200).json({
        message: 'Verified Successfully'
    });
});
exports.verify_email = verify_email;
const sendWhitePaper = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const { name, email, organisationName } = req.body;
    const WhitePaper = await prisma.whitePaper.findFirst({
        where: { id }
    });
    if (!WhitePaper) {
        const error = new Error("White Paper not found");
        error.status = 404;
        return next(error);
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
                path: process.env.BACKEND_SITE_URL + WhitePaper.pdf
            }]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            const error = new Error("Error sending mail");
            error.status = 500;
            return next(error);
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({
            message: 'White Paper sent to your email'
        });
    });
});
exports.sendWhitePaper = sendWhitePaper;
const searchFeature = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { query } = req.body;
    const news = await prisma.$queryRaw `
    SELECT * 
    FROM "News" 
    WHERE similarity(title, ${query}) > 0.1;
  `;
    const blogs = await prisma.$queryRaw `
    SELECT * 
    FROM "Blog" 
    WHERE similarity(title, ${query}) > 0.1;
  `;
    const caseStudies = await prisma.$queryRaw `
   SELECT * 
   FROM "CaseStudy" 
   WHERE similarity(title, ${query}) > 0.1;
 `;
    const webinars = await prisma.$queryRaw `
   SELECT * 
   FROM "Webinar" 
   WHERE similarity(title, ${query}) > 0.1;
 `;
    const whitePapers = await prisma.$queryRaw `
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
    });
});
exports.searchFeature = searchFeature;
const saveMyInfo = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { positionId, userId, where_did_you_hear_about_us, previously_worked_for_saraca, country, name, address, country_code, mobile_no } = req.body;
    const userDetailsFound = await prisma.userDetails.findFirst({
        where: { positionId, userId }
    });
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
            });
        }
        else {
            await prisma.userDetails.update({
                where: { id: userDetailsFound.id },
                data: { where_did_you_hear_about_us, previously_worked_for_saraca, country, name, address, country_code, mobile_no }
            });
        }
        res.status(201).json({
            message: "Details saved successfully"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.saveMyInfo = saveMyInfo;
const saveEducation = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { positionId, userId, school_university, degree, field_of_study, cgpa, skills, linkedin_account, filename } = req.body;
    const userDetails = await prisma.userDetails.findFirst({
        where: {
            userId,
            positionId
        }
    });
    if (req?.files?.resume) {
        const file = req.files.resume;
        const filename = Date.now() + "__" + file.name;
        const filepath = path_1.default.join(__dirname, `../../public/resumes/${filename}`);
        fs_1.default.promises.copyFile(file.path, filepath)
            .then(async () => {
            await prisma.userDetails.update({
                where: { id: userDetails.id },
                data: { school_university, degree, field_of_study, cgpa: parseFloat(cgpa), skills, resume: `/resumes/${filename}`, linkedin_account }
            });
            res.status(201).json({
                message: "Details saved successfully"
            });
        })
            .catch((e) => {
            console.log(e);
            const error = new Error('Error uploading file');
            error.status = 500;
            return next(error);
        });
    }
    else {
        await prisma.userDetails.update({
            where: { id: userDetails.id },
            data: { school_university, degree, field_of_study, cgpa: parseFloat(cgpa), skills, resume: filename, linkedin_account }
        });
        res.status(201).json({
            message: "Details saved successfully"
        });
    }
});
exports.saveEducation = saveEducation;
const saveExperience = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { positionId, userId, relevant_experience, relevant_experience_role_description, total_experience, total_experience_role_description } = req.body;
    const userDetails = await prisma.userDetails.findFirst({
        where: { positionId, userId }
    });
    await prisma.userDetails.update({
        where: { id: userDetails.id },
        data: { relevant_experience: parseFloat(relevant_experience), relevant_experience_role_description, total_experience: parseFloat(total_experience), total_experience_role_description }
    });
    res.status(201).json({
        message: "Details saved successfully"
    });
});
exports.saveExperience = saveExperience;
const saveAgreement = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { positionId, userId, agreement_for_contact, gender } = req.body;
    const userDetails = await prisma.userDetails.findFirst({
        where: { positionId, userId }
    });
    await prisma.userDetails.update({
        where: { id: userDetails.id },
        data: { agreement_for_contact, gender }
    });
    res.status(201).json({
        message: "Details saved successfully"
    });
});
exports.saveAgreement = saveAgreement;
const saveApplicationForm = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { positionId, userId } = req.body;
    const userDetails = await prisma.userDetails.findFirst({
        where: { positionId, userId }
    });
    await prisma.userDetails.update({
        where: { id: userDetails.id },
        data: { terms_conditions: true }
    });
    res.status(201).json({
        message: "Application submitted successfully"
    });
});
exports.saveApplicationForm = saveApplicationForm;
const getApplicationDetails = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { positionId, userId } = req.body;
    const userDetails = await prisma.userDetails.findFirst({
        where: {
            userId,
            positionId
        }
    });
    if (!userDetails) {
        const userDetailsLatest = await prisma.userDetails.findFirst({
            where: { userId, terms_conditions: true },
            orderBy: { updated_at: "desc" }
        });
        res.status(200).json({
            message: "Details fetched successfully",
            userDetails: userDetailsLatest
        });
    }
    else
        res.status(200).json({
            message: "Details fetched successfully",
            userDetails: userDetails
        });
});
exports.getApplicationDetails = getApplicationDetails;
