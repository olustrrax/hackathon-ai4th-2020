import { getCodeCountry, searchFlight } from "./search"
import { Payload, Platforms } from "dialogflow-fulfillment"
import moment from "moment"
// import news from "../scrapweb/new.json"


export const SearchFlight = async (agent) => {
  const { parameters } = agent
  let payloadJson = {
      "type": "template",
      "altText": "This is all flight",
      "template": {
        "type": "carousel",
        "actions": [],
        "columns": [{}]
      }
    }
  if(parameters?.departureCity && parameters?.['flightToGo'] && parameters?.['flightToBack']){
    try{
      const codeCountry = await getCodeCountry(parameters.departureCity)
            
      let linkSuggestion = `https://www.kiwi.com/deep?from=${codeCountry}&to=BKK&departure=${moment(parameters['flightToGo']).format("YYYY-MM-DD")}
      &return=${moment(parameters['flightToBack']).format("YYYY-MM-DD")}&passengers=${parameters['number-integer']||1}&currency=THB`
      let data = {
        flyFrom: codeCountry,
        to: `BKK`,
        dateFrom: moment(parameters['flightToGo']).format("DD/MM/YYYY"),
        dateTo: moment(parameters['flightToBack']).format("DD/MM/YYYY"),
        adult: parameters?.['number-integer'] || 1,
        curr: `THB`,
        partner: `picky`,
        limit: 5,
        sort: 'price'
      }
      const response:any = await searchFlight(data)
      // console.log('INPUT:',data)
      // console.log('response:',response)
      const columns = await response.map((e,i) => {
        let dTime = moment(e['dTime']*1000).format("DD/MM/YYYY HH:mm")
        let aTime = moment(e['aTime']*1000).format("DD/MM/YYYY HH:mm")
        return {
          "title": `Depart time: ${dTime}, Arrival time: ${aTime}`,
          "text": `Price ${e.price.toLocaleString()} Duration ${e['fly_duration']}`,
          "actions": [
            {
              "type": "uri",
              "label": `${e.cityFrom} to ${e.cityTo}`,
              "uri": `${linkSuggestion || e.deep_link}`
            }
          ]
          // "title": `${e.title}`,
          // "text": `${e.title_cn}`,
          // "actions": [
          //   {
          //     "type": "uri",
          //     "label": `Open news`,
          //     "uri": `${e.link}`
          //   }
          // ]
        }
      })
      console.log('columns:',columns)
      payloadJson.template.columns = columns
      // console.log('Table:',JSON.stringify(payloadJson))

      console.log('link:',linkSuggestion)

      const payload = new Payload(Platforms?.LINE || 'LINE', payloadJson, { sendAsMessage: true });
      agent.add(payload);
    }catch(err) {
      console.log('ERROR!:',err)
    }
  }
  else{
    console.log('conv!',JSON.stringify(parameters))
  }
}