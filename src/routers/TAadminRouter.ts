import express from 'express'
import { addPosition, addRegion, deletePosition } from '../controlllers/TAadminControllers';

const Router = express.Router()

Router.post('/add_region', addRegion);

Router.post('/add_position', addPosition);

Router.get('/delete_position/:id', deletePosition)

export default Router;