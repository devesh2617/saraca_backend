import express from 'express'
import { addWhitePaper, addNews, addWebinar, addBlog, addCaseStudy, editWhitePaper, editCaseStudy, editNews, editBlog, editWebinar } from '../controlllers/AdminControllers'

const Router = express.Router();

Router.post('/create_white_paper', addWhitePaper);
Router.post('/create_news', addNews);
Router.post('/create_webinar', addWebinar);
Router.post('/create_blog', addBlog);
Router.post('/create_case_study', addCaseStudy);
Router.post('/edit_white_paper/:id', editWhitePaper);
Router.post('/edit_case_study/:id', editCaseStudy);
Router.post('/edit_news/:id', editNews);
Router.post('/edit_blog/:id', editBlog);
Router.post('/edit_webinar/:id', editWebinar);
Router.get('/delete_white_paper/:id');
Router.get('/delete_case_study/:id');
Router.get('/delete_news/:id');
Router.get('/delete_blog/:id');
Router.get('/delete_webinar/:id');
export default Router;