"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SuperUserControllers_1 = require("../controlllers/SuperUserControllers");
const Router = express_1.default.Router();
Router.post('/create_user', SuperUserControllers_1.createUser);
Router.post('/create_role', SuperUserControllers_1.createRole);
Router.post('/delete_role', SuperUserControllers_1.deleteRole);
Router.post('/delete_user', SuperUserControllers_1.deleteUser);
exports.default = Router;
