import express from 'express'
import { createRole, createUser, deleteRole, deleteUser } from '../controlllers/SuperUserControllers'
const Router = express.Router()

Router.post('/create_user', createUser);
Router.post('/create_role', createRole);
Router.post('/delete_role', deleteRole);
Router.post('/delete_user', deleteUser);

export default Router;