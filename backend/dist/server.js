"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default);
server.listen(process.env.PORT || 3000, () => {
    // tslint:disable-next-line:no-console
    console.log("Backend has started on port 3000");
});
