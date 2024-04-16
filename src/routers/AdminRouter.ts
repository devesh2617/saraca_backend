import express from 'express'
import { addWhitePaper, addNews, addWebinar, addBlog, addCaseStudy, editWhitePaper } from '../controlllers/AdminControllers'

const Router = express.Router();

Router.post('/create_white_paper', addWhitePaper);
Router.post('/create_news', addNews);
Router.post('/create_webinar', addWebinar);
Router.post('/create_blog', addBlog);
Router.post('/create_case_study', addCaseStudy);
Router.post('/edit_white_paper/:id', editWhitePaper);
export default Router;