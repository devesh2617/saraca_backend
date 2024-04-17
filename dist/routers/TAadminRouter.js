"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TAadminControllers_1 = require("../controlllers/TAadminControllers");
const Router = express_1.default.Router();
Router.post('/add_region', TAadminControllers_1.addRegion);
Router.post('/add_position', TAadminControllers_1.addPosition);
Router.post('/edit_position/:id', TAadminControllers_1.editPosition);
Router.get('/delete_position/:id', TAadminControllers_1.deletePosition);
exports.default = Router;
