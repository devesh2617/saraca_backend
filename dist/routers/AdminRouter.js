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
Router.get('/get_white_papers', AdminControllers_1.getWhitePapers);
Router.get('/get_news', AdminControllers_1.getNews);
Router.get('get_webinars', AdminControllers_1.getWebinars);
Router.get('/get_blogs', AdminControllers_1.getBlogs);
exports.default = Router;
