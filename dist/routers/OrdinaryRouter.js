"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrdinaryControllers_1 = require("../controlllers/OrdinaryControllers");
const Router = express_1.default.Router();
Router.get('/get_white_papers', OrdinaryControllers_1.getWhitePapers);
Router.get('/get_white_papers_by_industry', OrdinaryControllers_1.getWhitePapersbyIndustry);
Router.get('/get_news', OrdinaryControllers_1.getNews);
Router.get('/get_webinars', OrdinaryControllers_1.getWebinars);
Router.get('/get_blogs', OrdinaryControllers_1.getBlogs);
Router.get('/get_case_studies', OrdinaryControllers_1.getCaseStudies);
Router.get('/get_case_studies_by_industry', OrdinaryControllers_1.getCaseStudiesbyIndustry);
Router.get('/get_regions', OrdinaryControllers_1.getRegions);
Router.get('/get_positions', OrdinaryControllers_1.getPositions);
Router.get('/get_positions_by_region/:region_name', OrdinaryControllers_1.getPositionsbyRegion);
Router.get('/get_position/:id', OrdinaryControllers_1.getPositionbyId);
Router.get('/get_white_paper/:id', OrdinaryControllers_1.getWhitePaperbyId);
Router.get('/get_news/:id', OrdinaryControllers_1.getNewsbyId);
Router.get('/get_blog/:id', OrdinaryControllers_1.getBlogbyId);
Router.get('/get_case_study/:id', OrdinaryControllers_1.getCaseStudybyId);
Router.get('/get_webinar/:id', OrdinaryControllers_1.getWebinarbyId);
Router.get('/get_region/:id', OrdinaryControllers_1.getRegionbyId);
Router.post('/career/register_user', OrdinaryControllers_1.createUser);
Router.post('/career/login_user', OrdinaryControllers_1.check_login);
Router.get('/career/verify_email/:id', OrdinaryControllers_1.verify_email);
Router.post('/send_white_paper/:id', OrdinaryControllers_1.sendWhitePaper);
Router.post('/search', OrdinaryControllers_1.searchFeature);
Router.post('/career/save_my_information', OrdinaryControllers_1.saveMyInfo);
Router.post('/career/save_education', OrdinaryControllers_1.saveEducation);
Router.post('/career/save_experience', OrdinaryControllers_1.saveExperience);
Router.post('/career/save_agreement', OrdinaryControllers_1.saveAgreement);
Router.post('/career/get_my_application_details', OrdinaryControllers_1.getApplicationDetails);
Router.post('/career/save_application_form', OrdinaryControllers_1.saveApplicationForm);
Router.post('/get_discover_more_by_ids', OrdinaryControllers_1.getDiscoverMore);
exports.default = Router;
