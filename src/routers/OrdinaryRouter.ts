import express from 'express'
import { getWhitePapers, getNews, getWebinars, getBlogs, getCaseStudies, getRegions, getPositions, getPosition, getWhitePaper } from '../controlllers/OrdinaryControllers'

const Router = express.Router();

Router.get('/get_white_papers', getWhitePapers);
Router.get('/get_news', getNews);
Router.get('/get_webinars', getWebinars);
Router.get('/get_blogs', getBlogs);
Router.get('/get_case_studies', getCaseStudies);
Router.get('/get_regions', getRegions);
Router.get('/get_positions', getPositions);
Router.get('/get_position/:id', getPosition);
Router.get('/get_white_paper/:id', getWhitePaper);
export default Router