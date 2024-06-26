import express from 'express'
import { getWhitePapers, getNews, getWebinars, getBlogs, getCaseStudies, getRegions, getPositions,  getPositionbyId, getWhitePaperbyId, getNewsbyId, getBlogbyId, getCaseStudybyId, getWebinarbyId, getRegionbyId, getPositionsbyRegion, createUser, check_login, verify_email, getWhitePapersbyIndustry, getCaseStudiesbyIndustry, sendWhitePaper, searchFeature, saveMyInfo,saveEducation, saveExperience, saveAgreement, getApplicationDetails, saveApplicationForm, getDiscoverMore, unsubscribe } from '../controlllers/OrdinaryControllers'

const Router = express.Router();

Router.get('/get_white_papers', getWhitePapers);
Router.get('/get_white_papers_by_industry', getWhitePapersbyIndustry);
Router.get('/get_news', getNews);
Router.get('/get_webinars', getWebinars);
Router.get('/get_blogs', getBlogs);
Router.get('/get_case_studies', getCaseStudies);
Router.get('/get_case_studies_by_industry', getCaseStudiesbyIndustry);
Router.get('/get_regions', getRegions);
Router.get('/get_positions', getPositions);
Router.get('/get_positions_by_region/:region_name', getPositionsbyRegion);
Router.get('/get_position/:id', getPositionbyId);
Router.get('/get_white_paper/:id', getWhitePaperbyId);
Router.get('/get_news/:id', getNewsbyId);
Router.get('/get_blog/:id', getBlogbyId);
Router.get('/get_case_study/:id', getCaseStudybyId);
Router.get('/get_webinar/:id', getWebinarbyId);
Router.get('/get_region/:id', getRegionbyId);
Router.post('/career/register_user', createUser);
Router.post('/career/login_user', check_login);
Router.get('/career/verify_email/:id', verify_email);
Router.post('/send_white_paper/:id', sendWhitePaper);
Router.post('/search', searchFeature);
Router.post('/career/save_my_information', saveMyInfo);
Router.post('/career/save_education', saveEducation);
Router.post('/career/save_experience', saveExperience);
Router.post('/career/save_agreement', saveAgreement);
Router.post('/career/get_my_application_details', getApplicationDetails);
Router.post('/career/save_application_form', saveApplicationForm);
Router.post('/get_discover_more_by_ids', getDiscoverMore);
Router.post('/unsubscribe', unsubscribe);

export default Router