import * as functions from 'firebase-functions';
import express from 'express'
import { PORT, LINE_USERID } from './setting'
import { Lexto, OCR, EN2TH, CN2TH, TH2CN } from './ai'
import { get } from "lodash"
import HandleEvents from './line/handleEvents';
import {  GETDATADAILY } from './covid/findlocation';
import { Fulfillment } from "./fulfillment"

const app = express()
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

//LINE WEBHOOK
app.post('/webhook', async (req, res) => {
	const events = get(req, ['body', 'events', '0']);
	const userId = get(events, ['source', 'userId']);
	console.log('events:',events)
	if (!Array.isArray(req.body.events)) {
    res.sendStatus(500)
    return
	}
	else{
    if(userId === LINE_USERID) return res.sendStatus(200);
    return HandleEvents(req, res, events)
  }
})

//FULFILLMENT
app.post('/fulfillment', Fulfillment)

// for test
app.get('/test', (req, res) => {
  res.send("Hello from Firebase!");
});

// for test 
app.get('/lexto', async function(req, res) {
  const { text } = req.query
  const result = await Lexto(typeof text === 'string'? text : '')
  res.send(result);
});

// for test 
app.get('/ocr', async function(req, res) {
  const result = await OCR()
  res.send(result);
});

// for test 
app.get('/en2th', async function(req, res) {
  const { text } = req.query
  const result = await EN2TH(typeof text === 'string'? text : '')
  res.send(result);
});

// for test
app.get('/cn2th', async function(req, res) {
  const { text } = req.query
  const result = await CN2TH(typeof text === 'string'? text : '')
  res.send(result);
});
// for test
app.get('/th2cn', async function(req, res) {
  const { text } = req.query
  const result = await TH2CN(typeof text === 'string'? text : '')
  console.log('result:',result)
  res.send(result);
});
// for test
app.get('/covid', async (req, res) => {
  const { text } = req.query
  const result = await GETDATADAILY(text)
  res.send(result);
})

app.listen(PORT, () => {
  console.log(`🚀 server is listening on port ${PORT}`);
});

export const api = functions.https.onRequest(app);