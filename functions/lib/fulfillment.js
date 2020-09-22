"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fulfillment = void 0;
const findlocation_1 = require("./covid/findlocation");
const daily_1 = require("./covid/daily");
const dialogflow_fulfillment_1 = require("dialogflow-fulfillment");
exports.Fulfillment = async (request, response) => {
    const agent = new dialogflow_fulfillment_1.WebhookClient({ request, response });
    let intentMap = new Map();
    intentMap.set('test - custom', findlocation_1.GETDATADAILY);
    intentMap.set('Covid_Location - custom', findlocation_1.GETDATADAILY);
    intentMap.set('Overview_Update', daily_1.CovidDaily);
    agent.handleRequest(intentMap);
};
//# sourceMappingURL=fulfillment.js.map