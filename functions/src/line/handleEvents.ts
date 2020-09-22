import { CONFIG_LINE } from "../setting"
import { get } from 'lodash';
import { EventBase, FollowEvent, Client, MessageEvent, UnfollowEvent } from "@line/bot-sdk";
import HandleMessage from "./handleMessage"

const client = new Client(CONFIG_LINE);

const HandleEvents = async (req:any, res:any, events:EventBase) => {
  /* Check Event Type */
  const eventType = get(events, 'type');
  switch (eventType) {
    case 'message':
      return HandleMessage(events as MessageEvent, client, req)

    case 'follow':
      return handleFollow(events as FollowEvent);

    case 'unfollow':
      return handleUnfollow(events as UnfollowEvent, res);
      
    default:
      throw new Error(`Unknown event: ${JSON.stringify(events)}`);
  }
}
const handleFollow = async (event: FollowEvent) => {
  /* Send response to client */
  const replyToken = get(event, 'replyToken');
	const userId = get(event, ['source', 'userId']) || ""
  const profile = await client.getProfile(userId)
  return client.replyMessage(replyToken, {type: "text" , text: `Hello ${profile.displayName}  🥰`})
  
}

const handleUnfollow = (event: UnfollowEvent, res) => {
  return res.sendStatus(200)
}


export default HandleEvents