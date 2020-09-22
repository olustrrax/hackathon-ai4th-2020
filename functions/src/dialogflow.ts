
import crypto from 'crypto'
import { CONFIG_LINE, PROJECT_ID } from './setting'
import axios, { AxiosRequestConfig } from 'axios'
const dialogflow = {
  postToDialogflow: async (req) => {
    req.headers.host = "dialogflow.cloud.google.com";
    let options: AxiosRequestConfig = {
      method: 'post',
      url: `https://dialogflow.cloud.google.com/v1/integrations/line/webhook/${PROJECT_ID}`,
      headers: req.headers,
      data: JSON.stringify(req.body)
    }
    try{
      let { data } = await axios(options);
      return data
    }catch(err){
      console.log('err')
    }
    return 
  },
  convertToDialogflow : async (req, body) => {
    const jsonBody = JSON.stringify(body);
    req.headers.host = "dialogflow.cloud.google.com";
    req.headers["x-line-signature"] = calculateLineSignature(jsonBody);
    req.headers["content-length"] = jsonBody.length;
    let options: AxiosRequestConfig = {
      method: 'post',
      url: `https://dialogflow.cloud.google.com/v1/integrations/line/webhook/${PROJECT_ID}`,
      headers: req.headers,
      data: jsonBody
    }
    try{
      let { data } = await axios(options);
      console.log('data:',data)
      return data
    }catch(err){
      console.log('err')
    }
    return 
  }
}


const calculateLineSignature = (body) => {
  const signature = crypto
    .createHmac('SHA256', CONFIG_LINE.channelSecret)
    .update(body).digest('base64');
  return signature;
}

export default dialogflow