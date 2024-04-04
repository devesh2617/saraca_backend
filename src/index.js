"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var nodemailer_1 = require("nodemailer");
var app = (0, express_1["default"])();
var path_1 = require("path");
var dotenv_1 = require("dotenv");
var express_form_data_1 = require("express-form-data");
var cors_1 = require("cors");
var express_async_handler_1 = require("express-async-handler");
var errorMiddleware_1 = require("./middlewares/errorMiddleware");
var SuperUserRouter_1 = require("./routers/SuperUserRouter");
var client_1 = require("@prisma/client");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var superUserMiddleware_1 = require("./middlewares/superUserMiddleware");
var TAadminMiddleware_1 = require("./middlewares/TAadminMiddleware");
var TAadminRouter_1 = require("./routers/TAadminRouter");
var prisma = new client_1.PrismaClient();
dotenv_1["default"].config();
// app.locals.cookieOptions = {
//   httpOnly: true,
//   secure: false,
//   domain: process.env.FRONTEND_SITE_URL
// }
var PORT = 5000;
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
var styledText = '\x1b[33;4m'; // 33 is for yellow color, 4 is for underline
var resetFormatting = '\x1b[0m';
// app.use(cookieParser())
app.use(express_form_data_1["default"].parse());
app.use((0, cors_1["default"])(corsOptions));
app.use(express_1["default"].static(path_1["default"].join(__dirname, '../public')));
app.listen(PORT, function () {
    console.log("".concat(styledText, "Server is running ").concat(PORT).concat(resetFormatting));
});
app.use(errorMiddleware_1["default"]);
app.post("/login", (0, express_async_handler_1["default"])(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, error, error, result, error, payload, expiresIn, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email.toLowerCase() },
                        include: { Role: true }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    error = new Error();
                    error.status = 401;
                    error.message = "No user found with the email";
                    return [2 /*return*/, next(error)];
                }
                if (user.Role.role !== 'superuser' && user.Role.role !== "admin" && user.Role.role !== "TAadmin") {
                    error = new Error();
                    error.status = 401;
                    error.message = "Unauthorised";
                    return [2 /*return*/, next(error)];
                }
                return [4 /*yield*/, bcrypt_1["default"].compare(password, user.password)];
            case 2:
                result = _b.sent();
                if (!result) {
                    error = new Error();
                    error.status = 401;
                    error.message = "Password is wrong";
                    return [2 /*return*/, next(error)];
                }
                payload = {
                    id: user.id
                };
                expiresIn = '24h';
                return [4 /*yield*/, jsonwebtoken_1["default"].sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn })];
            case 3:
                token = _b.sent();
                res.status(200).json({
                    message: 'Logged in successfully',
                    role: user.Role.role,
                    token: token
                });
                return [2 /*return*/];
        }
    });
}); }));
app.get('/check_user', (0, express_async_handler_1["default"])(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, error, decoded, user, error;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
                if (!token) {
                    error = new Error("unauthorized");
                    error.status = 401;
                    return [2 /*return*/, next(error)];
                }
                return [4 /*yield*/, jsonwebtoken_1["default"].verify(token, process.env.SECRET_KEY)];
            case 1:
                decoded = _c.sent();
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: decoded.id },
                        include: { Role: true }
                    })];
            case 2:
                user = _c.sent();
                if (!user) {
                    error = new Error("User not found");
                    error.status = 401;
                    return [2 /*return*/, next(error)];
                }
                res.status(200).json({
                    valid: true,
                    role: user.Role.role
                });
                return [2 /*return*/];
        }
    });
}); }));
app.use('/superuser', superUserMiddleware_1["default"], SuperUserRouter_1["default"]);
app.use('/TAadmin', TAadminMiddleware_1["default"], TAadminRouter_1["default"]);
app.post('/contact_us', (0, express_async_handler_1["default"])(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, country_code, organisation, mobile_no, country, industry, message, transporter;
    return __generator(this, function (_b) {
        _a = req.body, name = _a.name, email = _a.email, country_code = _a.country_code, organisation = _a.organisation, mobile_no = _a.mobile_no, country = _a.country, industry = _a.industry, message = _a.message;
        transporter = nodemailer_1["default"].createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS
            }
        });
        transporter.sendMail({
            from: "\"SARACA Website\" <".concat(process.env.USER_EMAIL, ">"),
            to: "".concat(process.env.CONTACT_SARACA_EMAIL, " ").concat(email),
            subject: "Contact Us mail from SARACA Website",
            html: "<!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n          <meta charset=\"UTF-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n          <title>Contact Us Email</title>\n          <style>\n            body {\n              font-family: Arial, sans-serif;\n              background-color: #f2f2f2;\n              margin: 0;\n              padding: 20px;\n            }\n            table {\n              border-collapse: collapse;\n              width: 100%;\n              background-color: #fff;\n              border-radius: 5px;\n            }\n            th, td {\n              padding: 10px;\n              text-align: left;\n              border-bottom: 1px solid #ddd;\n            }\n            th {\n              background-color: #f2f2f2;\n            }\n            .highlight {\n              background-color: #f7e6ff; /* Light purple */\n            }\n          </style>\n        </head>\n        <body>\n          <table>\n            <tr class=\"highlight\">\n              <th colspan=\"2\">Contact Information</th>\n            </tr>\n            <tr>\n              <td><strong>Name:</strong></td>\n              <td>".concat(name, "</td>\n            </tr>\n            <tr>\n              <td><strong>Email:</strong></td>\n              <td>").concat(email, "</td>\n            </tr>\n            <tr>\n              <td><strong>Organisation:</strong></td>\n              <td>").concat(organisation, "</td>\n            </tr>\n            <tr>\n              <td><strong>Mobile No:</strong></td>\n              <td>").concat(country_code, " ").concat(mobile_no, "</td>\n            </tr>\n            <tr>\n              <td><strong>Country:</strong></td>\n              <td>").concat(country, "</td>\n            </tr>\n            <tr>\n              <td><strong>Industry:</strong></td>\n              <td>").concat(industry, "</td>\n            </tr>\n            <tr>\n              <td><strong>Message:</strong></td>\n              <td>").concat(message, "</td>\n            </tr>\n          </table>\n        </body>\n        </html>\n        ")
        }, function (err, info) {
            if (err) {
                next(err);
            }
            return res.status(200).json({
                message: "Email Sent Successfully",
                messageId: info.messageId
            });
        });
        return [2 /*return*/];
    });
}); }));
