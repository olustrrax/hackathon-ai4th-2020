"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const setting_1 = require("./setting");
const axios_1 = __importDefault(require("axios"));
const dialogflow = {
    postToDialogflow: async (req) => {
        req.headers.host = "dialogflow.cloud.google.com";
        let options = {
            method: 'post',
            url: `https://dialogflow.cloud.google.com/v1/integrations/line/webhook/${setting_1.PROJECT_ID}`,
            headers: req.headers,
            data: JSON.stringify(req.body)
        };
        try {
            let { data } = await axios_1.default(options);
            return data;
        }
        catch (err) {
            console.log('err');
        }
        return;
    },
    convertToDialogflow: async (req, body) => {
        const jsonBody = JSON.stringify(body);
        req.headers.host = "dialogflow.cloud.google.com";
        req.headers["x-line-signature"] = calculateLineSignature(jsonBody);
        req.headers["content-length"] = jsonBody.length;
        let options = {
            method: 'post',
            url: `https://dialogflow.cloud.google.com/v1/integrations/line/webhook/${setting_1.PROJECT_ID}`,
            headers: req.headers,
            data: jsonBody
        };
        try {
            let { data } = await axios_1.default(options);
            return data;
        }
        catch (err) {
            console.log('err');
        }
        return;
    }
};
const calculateLineSignature = (body) => {
    const signature = crypto_1.default
        .createHmac('SHA256', setting_1.CONFIG_LINE.channelSecret)
        .update(body).digest('base64');
    return signature;
};
exports.default = dialogflow;
//# sourceMappingURL=dialogflow.js.map