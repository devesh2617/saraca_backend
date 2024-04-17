import express from 'express'
import { addPosition, addRegion, deletePosition, editPosition } from '../controlllers/TAadminControllers';

const Router = express.Router()

Router.post('/add_region', addRegion);
Router.post('/add_position', addPosition);
Router.post('/edit_position/:id', editPosition)
Router.get('/delete_position/:id', deletePosition)

export default Router;