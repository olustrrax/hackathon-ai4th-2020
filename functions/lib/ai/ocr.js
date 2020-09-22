"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OCR = void 0;
const axios_1 = __importDefault(require("axios"));
const url = `https://api.aiforthai.in.th/ocr`;
const setting_1 = require("../setting");
exports.OCR = async () => {
    const options = {
        method: "post",
        url,
        headers: {
            Apikey: setting_1.API_KEY_AI4TH,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            uploadfile: "https://i.imgur.com/R5FOlEj.jpg"
        },
    };
    const { data } = await axios_1.default(options);
    return data;
};
//# sourceMappingURL=ocr.js.map