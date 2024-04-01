import express from 'express'
import { addPosition, addRegion, getRegions } from '../controlllers/TAadminControllers';

const Router = express.Router()

Router.post('/add_region', addRegion);
Router.get('/get_regions', getRegions);
Router.post('/add_position', addPosition);

export default Router;