import express from 'express'
import { addWhitePaper, addNews, addWebinar, addBlog } from '../controlllers/AdminControllers'
const Router = express.Router()

Router.post('/create_white_paper', addWhitePaper);
Router.post('/create_case_study', addNews);
Router.post('/create_webinar', addWebinar);
Router.post('/create_blog', addBlog);


export default Router;