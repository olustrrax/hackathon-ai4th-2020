import axios, { AxiosRequestConfig } from 'axios'
const url = `https://api.aiforthai.in.th/xiaofan-en-th`
import { API_KEY_AI4TH } from '../setting'


export const EN2TH = async (text:string = "") => {
  console.log('text',text)
  const options:AxiosRequestConfig= {
    method: "get",
    url: `${url}/${encodeURI(text)}`,
    headers: {
      Apikey: API_KEY_AI4TH,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try{
    const { data } = await axios(options)
    return data
  }catch(err){
    console.log('err:',err)
  }
  
}
