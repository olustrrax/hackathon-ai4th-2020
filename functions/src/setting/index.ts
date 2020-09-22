import dotenv from "dotenv"
import { ILine } from "../interface"
dotenv.config()

export const API_KEY_AI4TH = process.env.API_KEY_AI4TH
export const PROJECT_ID = process.env.PROJECT_ID
export const PORT = 5000

export const CONFIG_LINE: ILine = {
  channelAccessToken: process.env.ACCESS_TOKEN || "",
  channelSecret: process.env.CHANNEL_SECRET || "",
  notifyToken: process.env.NOTIFY_TOKEN || ""
}

export const LINE_WEBHOOK_ABDUL: string = process.env.LINE_WEBHOOK_ABDUL ||""

export const LINE_USERID:string = process.env.LINE_USERID || ""

export const API_KEY_DGA:string = process.env.API_KEY_DGA || ""
export const API_KEY_LONGDO:string = process.env.API_KEY_LONGDO || ""