import express from 'express'
import { addWhitePaper, addNews, addWebinar, addBlog, getWhitePapers, getNews, getWebinars, getBlogs } from '../controlllers/AdminControllers'

const Router = express.Router();

Router.post('/create_white_paper', addWhitePaper);
Router.post('/create_news', addNews);
Router.post('/create_webinar', addWebinar);
Router.post('/create_blog', addBlog);
Router.get('/get_white_papers', getWhitePapers);
Router.get('/get_news', getNews);
Router.get('get_webinars', getWebinars);
Router.get('/get_blogs', getBlogs);
export default Router;