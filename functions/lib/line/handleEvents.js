"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setting_1 = require("../setting");
const lodash_1 = require("lodash");
const bot_sdk_1 = require("@line/bot-sdk");
const handleMessage_1 = __importDefault(require("./handleMessage"));
const client = new bot_sdk_1.Client(setting_1.CONFIG_LINE);
const HandleEvents = async (req, res, events) => {
    /* Check Event Type */
    const eventType = lodash_1.get(events, 'type');
    switch (eventType) {
        case 'message':
            return handleMessage_1.default(events, client, req);
        case 'follow':
            return handleFollow(events);
        case 'unfollow':
            return handleUnfollow(events, res);
        default:
            throw new Error(`Unknown event: ${JSON.stringify(events)}`);
    }
};
const handleFollow = async (event) => {
    /* Send response to client */
    const replyToken = lodash_1.get(event, 'replyToken');
    const userId = lodash_1.get(event, ['source', 'userId']) || "";
    const profile = await client.getProfile(userId);
    return client.replyMessage(replyToken, { type: "text", text: `Hello ${profile.displayName}  🥰` });
};
const handleUnfollow = (event, res) => {
    return res.sendStatus(200);
};
exports.default = HandleEvents;
//# sourceMappingURL=handleEvents.js.map