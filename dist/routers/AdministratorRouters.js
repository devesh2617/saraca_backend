"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdministratorControllers_1 = require("../controlllers/AdministratorControllers");
const Router = express_1.default.Router();
Router.post('/create_users', AdministratorControllers_1.createUsers);
Router.post('/create_role', AdministratorControllers_1.createRole);
Router.post('/delete_role', AdministratorControllers_1.deleteRole);
exports.default = Router;
