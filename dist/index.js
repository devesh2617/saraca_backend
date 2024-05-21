"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_form_data_1 = __importDefault(require("express-form-data"));
const cors_1 = __importDefault(require("cors"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const SuperUserRouter_1 = __importDefault(require("./routers/SuperUserRouter"));
const AdminRouter_1 = __importDefault(require("./routers/AdminRouter"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const superUserMiddleware_1 = __importDefault(require("./middlewares/superUserMiddleware"));
const TAadminMiddleware_1 = __importDefault(require("./middlewares/TAadminMiddleware"));
const TAadminRouter_1 = __importDefault(require("./routers/TAadminRouter"));
const adminMiddleware_1 = __importDefault(require("./middlewares/adminMiddleware"));
const OrdinaryRouter_1 = __importDefault(require("./routers/OrdinaryRouter"));
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
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
app.use(express_form_data_1.default.parse({
    maxFileSize: 100 * 1024 * 1024, // 100MB limit
    autoClean: true // Automatically clean uploaded files
}));
app.use(express_form_data_1.default.union());
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.listen(PORT, () => {
    console.log(`${styledText}Server is running ${PORT}${resetFormatting}`);
});
app.use(errorMiddleware_1.default);
app.post("/login", (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        include: { Role: true }
    });
    if (!user) {
        const error = new Error();
        error.status = 401;
        error.message = "No user found with the email";
        return next(error);
    }
    if (user.Role.role !== 'superuser' && user.Role.role !== "admin" && user.Role.role !== "TAadmin") {
        const error = new Error();
        error.status = 401;
        error.message = "Unauthorised";
        return next(error);
    }
    const result = await bcrypt_1.default.compare(password, user.password);
    if (!result) {
        const error = new Error();
        error.status = 401;
        error.message = "Password is wrong";
        return next(error);
    }
    const payload = {
        id: user.id
    };
    const expiresIn = '24h';
    const token = await jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn });
    res.status(200).json({
        message: 'Logged in successfully',
        role: user.Role.role,
        token
    });
}));
app.get('/check_user', (0, express_async_handler_1.default)(async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
        const error = new Error("unauthorized");
        error.status = 401;
        return next(error);
    }
    const decoded = await jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        include: { Role: true }
    });
    if (!user) {
        const error = new Error("User not found");
        error.status = 401;
        return next(error);
    }
    res.status(200).json({
        valid: true,
        role: user.Role.role
    });
}));
app.use('/superuser', superUserMiddleware_1.default, SuperUserRouter_1.default);
app.use('/TAadmin', TAadminMiddleware_1.default, TAadminRouter_1.default);
app.use('/admin', adminMiddleware_1.default, AdminRouter_1.default);
app.use('/api', OrdinaryRouter_1.default);
app.post('/contact_us', (0, express_async_handler_1.default)(async (req, res, next) => {
    const { name, email, country_code, organisation, mobile_no, country, industry, message } = req.body;
    const transporter = nodemailer_1.default.createTransport({
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
    }, (err, info) => {
        if (err) {
            next(err);
        }
        return res.status(200).json({
            message: "Email Sent Successfully",
            messageId: info.messageId
        });
    });
}));
