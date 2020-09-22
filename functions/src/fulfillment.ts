import { GETDATADAILY } from "./covid/findlocation"
import { CovidDaily } from './covid/daily'
import { SearchFlight } from "./searchflight"
import { WebhookClient } from 'dialogflow-fulfillment'
import { GETNEWS } from "./scrapweb/getnews"
export const Fulfillment = async (request, response) => {
  const agent = new WebhookClient({ request, response });
  let intentMap = new Map()
  intentMap.set('test - custom', GETDATADAILY);
  intentMap.set('Covid_Location - custom', GETDATADAILY);
  intentMap.set('Overview_Update', CovidDaily)
  intentMap.set('flight search01 - custom', SearchFlight)
  intentMap.set('covid news', GETNEWS)
  agent.handleRequest(intentMap);

}