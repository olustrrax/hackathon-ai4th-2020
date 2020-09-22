import news from "./new.json"
import { Payload, Platforms } from "dialogflow-fulfillment"
export const GETNEWS = async(agent) => {
  let payloadJson = {
    "type": "template",
    "altText": "This is all News",
    "template": {
      "type": "carousel",
      "actions": [],
      "columns": [{}]
    }
  }
  
  payloadJson.template.columns = await news.map((e,i) => {
    let list:any = {
      "title": `${e.title}`,
      "text": `${e.title_cn}`,
      "actions": [
        {
          "type": "uri",
          "label": `Open news`,
          "uri": `${e.link}`
        }
      ]
    }
    // o.push(list)
    return list;
  })
  // payloadJson.template.columns = newsData
  // console.log('payloadJson:',JSON.stringify(payloadJson))
  const payload = new Payload(Platforms?.LINE || 'LINE', payloadJson, { sendAsMessage: true });
  agent.add(payload);
  return 
}