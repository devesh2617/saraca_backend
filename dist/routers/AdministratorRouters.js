"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdministratorControllers_1 = require("../controlllers/AdministratorControllers");
const Router = express_1.default.Router();
Router.post('/create_user', AdministratorControllers_1.createUser);
Router.post('/create_role', AdministratorControllers_1.createRole);
Router.post('/delete_role', AdministratorControllers_1.deleteRole);
Router.post('/delete_user', AdministratorControllers_1.deleteUser);
exports.default = Router;
