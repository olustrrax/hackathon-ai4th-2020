"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const dialogflow_1 = __importDefault(require("../dialogflow"));
const HandleMessage = async (event, client, req) => {
    const message = lodash_1.get(event, 'message');
    /* Check Message Type */
    const messageType = lodash_1.get(message, 'type');
    switch (messageType) {
        case 'text':
            return handleText(event, client, req);
        // case 'image':
        //   return handleImage(event as MessageEvent, client as Client as IUsers);
        // case 'video':
        //   return handleVideo(event as MessageEvent, client as Client, user as IUsers);
        // case 'audio':
        //   return handleAudio(event as MessageEvent, client as Client, user as IUsers);
        case 'location':
            return handleLocation(event, client, req);
        // case 'sticker':
        //   return handleSticker(event as MessageEvent, client as Client, user as IUsers);
        default:
            throw new Error(`Unknown message: ${JSON.stringify(message)}`);
    }
};
const handleText = async (event, client, req) => {
    return dialogflow_1.default.postToDialogflow(req);
};
const handleLocation = async (event, client, req) => {
    // const replyToken = get(event, 'replyToken');
    // return client.replyMessage(replyToken, [{ "type": "text", "text": `latitude : ${latitude}, longtitude : ${longitude}` }])
    const latitude = lodash_1.get(event, ['message', 'latitude']);
    const longitude = lodash_1.get(event, ['message', 'longitude']);
    const text = `lat : ${latitude}, long : ${longitude}`;
    return dialogflow_1.default.convertToDialogflow(req, createFakeTextMessage(req, event, text));
};
const createFakeTextMessage = (req, event, text) => {
    return {
        events: [{
                type: 'message',
                replyToken: event.replyToken,
                source: event.source,
                timestamp: event.timestamp,
                mode: event.mode,
                message: {
                    type: 'text',
                    text,
                },
            }],
        destination: req.body.destination,
    };
};
exports.default = HandleMessage;
//# sourceMappingURL=handleMessage.js.map