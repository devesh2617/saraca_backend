"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminControllers_1 = require("../controlllers/AdminControllers");
const Router = express_1.default.Router();
Router.post('/create_white_paper', AdminControllers_1.addWhitePaper);
Router.post('/create_news', AdminControllers_1.addNews);
Router.post('/create_webinar', AdminControllers_1.addWebinar);
Router.post('/create_blog', AdminControllers_1.addBlog);
Router.post('/create_case_study', AdminControllers_1.addCaseStudy);
Router.post('/edit_white_paper/:id', AdminControllers_1.editWhitePaper);
exports.default = Router;
