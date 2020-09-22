"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_KEY_LONGDO = exports.API_KEY_DGA = exports.LINE_USERID = exports.LINE_WEBHOOK_ABDUL = exports.CONFIG_LINE = exports.PORT = exports.PROJECT_ID = exports.API_KEY_AI4TH = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.API_KEY_AI4TH = process.env.API_KEY_AI4TH;
exports.PROJECT_ID = process.env.PROJECT_ID;
exports.PORT = 5000;
exports.CONFIG_LINE = {
    channelAccessToken: process.env.ACCESS_TOKEN || "",
    channelSecret: process.env.CHANNEL_SECRET || "",
    notifyToken: process.env.NOTIFY_TOKEN || ""
};
exports.LINE_WEBHOOK_ABDUL = process.env.LINE_WEBHOOK_ABDUL || "";
exports.LINE_USERID = process.env.LINE_USERID || "";
exports.API_KEY_DGA = process.env.API_KEY_DGA || "";
exports.API_KEY_LONGDO = process.env.API_KEY_LONGDO || "";
//# sourceMappingURL=index.js.map