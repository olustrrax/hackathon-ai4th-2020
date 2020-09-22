import { get } from 'lodash';
import { MessageEvent, EventMessage, Client } from '@line/bot-sdk';
import dialogflow from "../dialogflow"
const HandleMessage = async (event: MessageEvent, client:Client, req) => {
  const message: EventMessage = get(event, 'message');

  /* Check Message Type */
  const messageType = get(message, 'type');
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
}


const handleText = async (event: MessageEvent, client:Client, req) => {
  return dialogflow.postToDialogflow(req);
}



const handleLocation =  async (event: MessageEvent, client:Client, req) => {
  const latitude = get(event, ['message', 'latitude']);
  const longitude = get(event, ['message', 'longitude']);
  const text = `lat : ${latitude}, long : ${longitude}`;
  return dialogflow.convertToDialogflow(req, createFakeTextMessage(req, event, text));
}

const createFakeTextMessage = (req, event, text) => {
  return {
    events:
      [{
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
}


export default HandleMessage