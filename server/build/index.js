"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the express in typescript file
var express_1 = __importDefault(require("express"));
// Initialize the express engine
var app = (0, express_1.default)();
// Take a port 3000 for running server.
var port = 3000;
// Handling '/' Request
app.get('/', function (_req, _res) {
    _res.send('TypeScript With Expresss');
});
// Server setup
app.listen(port, function () {
    // eslint-disable-next-line no-console
    console.log("TypeScript with Express http://localhost:".concat(port, "/"));
});
