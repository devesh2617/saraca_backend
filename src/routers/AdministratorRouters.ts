import express from 'express'
import { createRole, createUsers, deleteRole } from '../controlllers/AdministratorControllers'
const Router = express.Router()

Router.post('/create_users', createUsers);
Router.post('/create_role', createRole);
Router.post('/delete_role', deleteRole);

export default Router;