"use strict";
exports.__esModule = true;
var express_1 = require("express");
var TAadminControllers_1 = require("../controlllers/TAadminControllers");
var Router = express_1["default"].Router();
Router.post('/add_region', TAadminControllers_1.addRegion);
Router.get('/get_regions', TAadminControllers_1.getRegions);
Router.post('/add_position', TAadminControllers_1.addPosition);
exports["default"] = Router;
