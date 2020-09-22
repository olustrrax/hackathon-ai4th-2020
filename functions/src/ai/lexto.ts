import axios, { AxiosRequestConfig } from 'axios'
const url = `https://api.aiforthai.in.th/lextoplus`
import { API_KEY_AI4TH } from '../setting'

export const Lexto = async (text:string = "สวัสดีวันปีไก่") => {
  const options:AxiosRequestConfig= {
    method: "get",
    url,
    headers: {
      Apikey: API_KEY_AI4TH,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      text,
      norm: 0
    },
  };
  /**
     text : ข้อความที่ต้องการตัดคำ
        norm : การลดรูปตัวอักษรที่พิมพ์ซ้ำ (normalize)
         0 = ไม่ทำการ normalize (default)
         1 = ทำ normalize
     */
  const { data } = await axios(options)
  return data
}
