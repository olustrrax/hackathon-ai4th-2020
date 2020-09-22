"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = __importStar(require("firebase-functions"));
const express_1 = __importDefault(require("express"));
const setting_1 = require("./setting");
const ai_1 = require("./ai");
const lodash_1 = require("lodash");
// import * as language from "@google-cloud/language"
const handleEvents_1 = __importDefault(require("./line/handleEvents"));
const findlocation_1 = require("./covid/findlocation");
const fulfillment_1 = require("./fulfillment");
// const client = new language.LanguageServiceClient();
const app = express_1.default();
app.use(express_1.default.json()); // to support JSON-encoded bodies
app.use(express_1.default.urlencoded()); // to support URL-encoded bodies
app.get('/test', (req, res) => {
    res.send("Hello from Firebase!");
});
// for test 
app.get('/lexto', async function (req, res) {
    const { text } = req.query;
    const result = await ai_1.Lexto(typeof text === 'string' ? text : '');
    res.send(result);
});
// for test 
app.get('/ocr', async function (req, res) {
    const result = await ai_1.OCR();
    res.send(result);
});
// for test 
app.get('/en2th', async function (req, res) {
    const { text } = req.query;
    const result = await ai_1.EN2TH(typeof text === 'string' ? text : '');
    res.send(result);
});
// for test
app.get('/ch2th', async function (req, res) {
    const { text } = req.query;
    const result = await ai_1.CH2TH(typeof text === 'string' ? text : '');
    res.send(result);
});
// check othger language
// app.get('/classifyLN', async function(req, res) {
//   const { text } = req.query
//   console.log('text:',text)
//   const document:any = {
//     content: text || "",
//     type: 'PLAIN_TEXT',
//   };
//   const [classification] = await client.classifyText({document});
//   console.log('Categories:');
//   classification?.categories?.forEach(category => {
//     console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
//   });
//   // console.log('result:',result)
//   // res.send(result);
// });
app.post('/webhook', async (req, res) => {
    const events = lodash_1.get(req, ['body', 'events', '0']);
    const userId = lodash_1.get(events, ['source', 'userId']);
    console.log('events:', events);
    if (!Array.isArray(req.body.events)) {
        res.sendStatus(500);
        return;
    }
    else {
        if (userId === setting_1.LINE_USERID)
            return res.sendStatus(200);
        return handleEvents_1.default(req, res, events);
    }
});
app.post('/fulfillment', fulfillment_1.Fulfillment);
app.get('/covid', async (req, res) => {
    const { text } = req.query;
    const result = await findlocation_1.GETDATADAILY(text);
    res.send(result);
});
app.listen(setting_1.PORT, () => {
    console.log(`🚀 server is listening on port ${setting_1.PORT}`);
});
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map