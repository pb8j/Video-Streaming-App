"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_config_1 = require("./config/server.config");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)(); // create an instance of express
app.use((0, cors_1.default)());
app.use('/api', routes_1.default);
console.log(path_1.default.join(__dirname, '../output'));
app.use('/output', express_1.default.static(path_1.default.join(__dirname, '../output')));
app.listen(server_config_1.PORT, () => {
    console.log('Server is running on port 3000');
});
