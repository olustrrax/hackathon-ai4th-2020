import axios, { AxiosRequestConfig } from "axios";
import  {Payload, Platforms} from 'dialogflow-fulfillment'
export const CovidDaily = async (agent) => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: 'https://covid19.th-stat.com/api/open/today',
  };
  try{
    const { data } = await axios(config)
    const payloadJson = {
      "altText": "now covid in thailand",
      "type": "flex",
      "contents": {
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "size": "sm",
              "color": "#AA1FA5",
              "align": "center",
              "text": "Thailand Covid Daily Report",
              "weight": "bold"
            },
            {
              "layout": "horizontal",
              "contents": [
                {
                  "type": "spacer"
                },
                {
                  "layout": "vertical",
                  "type": "box",
                  "contents": [
                    {
                      "type": "spacer",
                      "size": "md"
                    },
                    {
                      "text": "Confirmed :",
                      "size": "xs",
                      "align": "start",
                      "type": "text"
                    },
                    {
                      "size": "xs",
                      "type": "text",
                      "text": "Recovered :"
                    },
                    {
                      "type": "text",
                      "text": "Hospitalized :",
                      "size": "xs"
                    },
                    {
                      "text": "Deaths :",
                      "type": "text",
                      "size": "xs"
                    },
                    {
                      "text": "NewConfirmed :",
                      "size": "xs",
                      "type": "text"
                    },
                    {
                      "size": "xs",
                      "type": "text",
                      "text": "NewRecovered : "
                    },
                    {
                      "size": "xs",
                      "type": "text",
                      "text": "NewHospitalized :"
                    },
                    {
                      "text": "NewDeaths :",
                      "type": "text",
                      "size": "xs"
                    },
                    {
                      "size": "xs",
                      "text": "UpdateDate :",
                      "type": "text"
                    },
                    {
                      "type": "text",
                      "text": "Source :",
                      "size": "xs"
                    },
                    {
                      "type": "text",
                      "size": "xs",
                      "text": "DevBy :"
                    },
                    {
                      "type": "text",
                      "text": "SeverBy :",
                      "size": "xs"
                    }
                  ]
                },
                {
                  "contents": [
                    {
                      "type": "spacer",
                      "size": "md"
                    },
                    {
                      "type": "text",
                      "size": "xs",
                      "align": "start",
                      "text": data?.['Confirmed'].toString(),
                      "weight": "bold"
                    },
                    {
                      "text": data?.['Recovered'].toString(),
                      "size": "xs",
                      "type": "text",
                      "weight": "bold"
                    },
                    {
                      "type": "text",
                      "weight": "bold",
                      "text": data?.['Hospitalized'].toString(),
                      "size": "xs"
                    },
                    {
                      "text": data?.['Deaths'].toString(),
                      "size": "xs",
                      "weight": "bold",
                      "type": "text"
                    },
                    {
                      "type": "text",
                      "text": data?.['NewConfirmed'].toString(),
                      "size": "xs",
                      "weight": "bold"
                    },
                    {
                      "type": "text",
                      "weight": "bold",
                      "text": data?.['NewRecovered'].toString(),
                      "size": "xs"
                    },
                    {
                      "size": "xs",
                      "type": "text",
                      "weight": "bold",
                      "text": data?.['NewHospitalized'].toString()
                    },
                    {
                      "weight": "bold",
                      "text": data?.['NewDeaths'].toString(),
                      "type": "text",
                      "size": "xs"
                    },
                    {
                      "size": "xs",
                      "text": data?.['UpdateDate'],
                      "weight": "bold",
                      "type": "text"
                    },
                    {
                      "size": "xs",
                      "text": data?.['Source'],
                      "weight": "bold",
                      "type": "text"
                    },
                    {
                      "type": "text",
                      "size": "xs",
                      "text": data?.['DevBy'],
                      "weight": "bold"
                    },
                    {
                      "text": data?.['SeverBy'],
                      "weight": "bold",
                      "type": "text",
                      "size": "xs"
                    }
                  ],
                  "type": "box",
                  "layout": "vertical"
                },
                {
                  "size": "lg",
                  "type": "spacer"
                }
              ],
              "type": "box"
            },
            {
              "type": "spacer",
              "size": "lg"
            }
          ],
          "margin": "sm"
        },
        "type": "bubble",
        "direction": "ltr"
      }
    }
    const payload = new Payload(Platforms?.LINE || 'LINE', payloadJson, { sendAsMessage: true });
    agent.add(payload)
  }catch(err){
    console.log('err:',err)
    return 
  }
}
