import axios, { AxiosRequestConfig } from 'axios'
import { API_KEY_DGA, API_KEY_LONGDO } from "../setting"
import _, { get } from "lodash"
import moment from "moment"
import  {Payload, Platforms} from 'dialogflow-fulfillment'
const testUrl = 'https://www.google.co.th/maps/place/Chiang+Mai,+Mueang+Chiang+Mai+District,+Chiang+Mai/@18.7942426,98.9213718,13z/data=!3m1!4b1!4m5!3m4!1s0x30da3a7e90bb6f5d:0x98d46270a59b4367!8m2!3d18.7883439!4d98.9853008?hl=en&authuser=0'
const urlDaily = `https://opend.data.go.th/get-ckan/datastore_search`
const urlProvince = "https://api.longdo.com/map/services/address";
const urlProvinceEN = `https://opend.data.go.th/get-ckan/datastore_search`
const limit = 500
export const GETDATADAILY = async (agent) => {
  let parameters = agent.parameters
  // console.log('parameters:',parameters)
  const url = agent.query
  const findLocation = await FindLocation((parameters?.lat && parameters?.long)? parameters : url)
  let offset = 0
  // console.log('findLocation:',findLocation)
  let province = findLocation?.province?.replace('จ.','')
  let pvEN = await axios({
    method: "get",
    url: urlProvinceEN,
    headers: {
      "api-key": API_KEY_DGA,
    },
    params: {
      resource_id: "48039a2a-2f01-448c-b2a2-bb0d541dedcd",
      q: province
    }
  })
  // console.log('pvEN:',pvEN)
  pvEN = get(pvEN, ['data','result','records',0])
  // console.log('pvEN:',pvEN)
  if(province.indexOf('กรุงเทพ') > -1 ) province = 'กทม'
  // console.log('province:',province)
  let options:AxiosRequestConfig= {
    method: "get",
    url: urlDaily,
    headers: {
      "api-key": API_KEY_DGA,
    },
    params: {
      resource_id: "0d3feada-3484-476f-85f7-c3edeb60a85d",
      q: province,
      offset,
      limit
    }
  };
  try{
    let { data } = await axios(options)
    let result = _.cloneDeep(data?.result?.records)
    let total = data?.result?.total
    while (offset + limit < total && offset > -1){
      offset = total - limit
      let { data }= await axios(options)
      result = result.concat(data?.result?.records)
    }
    console.log('result length',result.length)
    const SortByDate = await _.sortBy(result|| [], (e:any) => {
      return new Date(e['Notification date'])|| new Date(e['Announce Date'])
    }).reverse()
    let now = new Date().setHours(0,0,0,0)
    let lastestCase = get(SortByDate, [0])
    let safeDate14 = moment(lastestCase?.['Notification date'] || lastestCase?.['Announce Date']).add(14,'days').toDate().setHours(0,0,0,0)
    let safeDate26 = moment(lastestCase?.['Notification date'] || lastestCase?.['Announce Date']).add(14,'days').toDate().setHours(0,0,0,0)
    // console.log('lastestCase',lastestCase)
    // console.log('safeDate14',safeDate14)
    // console.log('now',now)
    // console.log('safe 26', safeDate26 < now)
    // console.log('safe 14', safeDate14 < now)
    const payloadJson = {
      "type" : "flex",
      "altText": "Check covid area",
      "contents" : { 
        "body": {
          "type": "box",
          "contents": [
            {
              "type": "spacer"
            },
            {
              "type": "text",
              "size": "lg",
              "text": `The Latest patient in ${pvEN?.['CHANGWAT_E']}`,
              "weight": "bold"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "spacer",
                      "size": "md"
                    },
                    {
                      "size": "xs",
                      "type": "text",
                      "text": "Case Number :"
                    },
                    {
                      "size": "xs",
                      "type": "text",
                      "text": "Date :"
                    },
                    {
                      "text": "Age :",
                      "type": "text",
                      "size": "xs"
                    },
                    {
                      "type": "text",
                      "size": "xs",
                      "text": "Sex :"
                    },
                    {
                      "type": "text",
                      "size": "xs",
                      "text": "Nationality :"
                    },
                    {
                      "text": "Province :",
                      "type": "text",
                      "size": "xs"
                    },
                    {
                      "text": "Safe to travel :",
                      "type": "text",
                    }
                  ],
                  "type": "box"
                },
                {
                  "contents": [
                    {
                      "type": "spacer",
                      "size": "md"
                    },
                    {
                      "size": "xs",
                      "text": `${lastestCase?.no}`,
                      "type": "text"
                    },
                    {
                      "type": "text",
                      "text": `${moment(lastestCase?.['Notification date']).format('YYYY-MM-DD')}`,
                      "size": "xs"
                    },
                    {
                      "text": `${lastestCase?.age}`,
                      "size": "xs",
                      "type": "text"
                    },
                    {
                      "text": `${lastestCase?.sex == 'หญิง'? "Female" : "Male"}`,
                      "size": "xs",
                      "type": "text"
                    },
                    {
                      "type": "text",
                      "size": "xs",
                      "text": `${lastestCase?.nationality}`
                    },
                    {
                      "size": "xs",
                      "type": "text",
                      "text": `${pvEN?.['CHANGWAT_E']}`
                    },
                    {
                      "text": safeDate14 < now? "Yes" : "Watch out",
                      "type": "text"
                    }
                  ],
                  "layout": "vertical",
                  "type": "box"
                }
              ]
            },
            {
              "contents": [
                {
                  "type": "spacer"
                },
                {
                  "style": "secondary",
                  "color": "#e6cab2ff",
                  "gravity": "center",
                  "type": "button",
                  "action": {
                    "label": "Search Flight",
                    "text": "Search Flight",
                    "type": "message"
                  }
                }
              ],
              "type": "box",
              "layout": "vertical"
            },
            {
              "type": "spacer"
            }
          ],
          "layout": "vertical"
        },
        "type": "bubble"
      }
    }
    const payload = new Payload(Platforms?.LINE || 'LINE', payloadJson, { sendAsMessage: true });
    agent.add(payload);
    return { ...lastestCase, safePlace14: safeDate14 < now, safePlace26: safeDate26 < now }
  }catch(err){
    console.log('err:',err)
    return
  }
}

export const FindLocation = async (url) => {
  const { lat, long } = typeof url === 'object' ? url : await getLocationByUrl(url)
  console.log('lat',lat,'long',long)
  return Province(lat, long)
  
}

const getLocationByUrl = (url:string = testUrl) => {
  const regex = new RegExp('@(.*),(.*),');
  let lon_lat_match = url.match(regex) || [];
  if(lon_lat_match.length){
    return { lat: lon_lat_match[1]?.replace('@',''), long: lon_lat_match[2]}
  }
  return { lat: "", long: "" }
}


const Province = (lat, lon) => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: urlProvince,
    params: {
      lat, lon, key : API_KEY_LONGDO
    }
  };
  return axios(config).then((res) => {
    if (res.data) {
      return res.data;
    }
    else return;
  });
};
