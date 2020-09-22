import axios, { AxiosRequestConfig } from 'axios'
const url = `https://api.aiforthai.in.th/ocr`
import { API_KEY_AI4TH } from '../setting'


export const OCR = async () => {
  const options:AxiosRequestConfig= {
    method: "post",
    url,
    headers: {
      Apikey: API_KEY_AI4TH,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      uploadfile: "https://i.imgur.com/R5FOlEj.jpg"
    },
  };
  const { data } = await axios(options)
  return data
}
