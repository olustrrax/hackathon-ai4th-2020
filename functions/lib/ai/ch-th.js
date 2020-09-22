"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CH2TH = void 0;
const axios_1 = __importDefault(require("axios"));
const url = `https://api.aiforthai.in.th/zh-th-nmt`;
const setting_1 = require("../setting");
exports.CH2TH = async (text = "") => {
    console.log('text', text);
    const options = {
        method: "get",
        url: `${url}/${encodeURI(text)}`,
        headers: {
            Apikey: setting_1.API_KEY_AI4TH,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    try {
        const { data } = await axios_1.default(options);
        return data;
    }
    catch (err) {
        console.log('err:', err);
    }
};
//# sourceMappingURL=ch-th.js.map