"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexto = void 0;
const axios_1 = __importDefault(require("axios"));
const url = `https://api.aiforthai.in.th/lextoplus`;
const setting_1 = require("../setting");
exports.Lexto = async (text = "สวัสดีวันปีไก่") => {
    const options = {
        method: "get",
        url,
        headers: {
            Apikey: setting_1.API_KEY_AI4TH,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
            text,
            norm: 0
        },
    };
    /**
       text : ข้อความที่ต้องการตัดคำ
          norm : การลดรูปตัวอักษรที่พิมพ์ซ้ำ (normalize)
           0 = ไม่ทำการ normalize (default)
           1 = ทำ normalize
       */
    const { data } = await axios_1.default(options);
    return data;
};
//# sourceMappingURL=lexto.js.map