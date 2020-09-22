"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CovidDaily = void 0;
const axios_1 = __importDefault(require("axios"));
const dialogflow_fulfillment_1 = require("dialogflow-fulfillment");
exports.CovidDaily = async (agent) => {
    const config = {
        method: "get",
        url: 'https://covid19.th-stat.com/api/open/today',
    };
    try {
        const { data } = await axios_1.default(config);
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
                                            "text": data === null || data === void 0 ? void 0 : data['Confirmed'].toString(),
                                            "weight": "bold"
                                        },
                                        {
                                            "text": data === null || data === void 0 ? void 0 : data['Recovered'].toString(),
                                            "size": "xs",
                                            "type": "text",
                                            "weight": "bold"
                                        },
                                        {
                                            "type": "text",
                                            "weight": "bold",
                                            "text": data === null || data === void 0 ? void 0 : data['Hospitalized'].toString(),
                                            "size": "xs"
                                        },
                                        {
                                            "text": data === null || data === void 0 ? void 0 : data['Deaths'].toString(),
                                            "size": "xs",
                                            "weight": "bold",
                                            "type": "text"
                                        },
                                        {
                                            "type": "text",
                                            "text": data === null || data === void 0 ? void 0 : data['NewConfirmed'].toString(),
                                            "size": "xs",
                                            "weight": "bold"
                                        },
                                        {
                                            "type": "text",
                                            "weight": "bold",
                                            "text": data === null || data === void 0 ? void 0 : data['NewRecovered'].toString(),
                                            "size": "xs"
                                        },
                                        {
                                            "size": "xs",
                                            "type": "text",
                                            "weight": "bold",
                                            "text": data === null || data === void 0 ? void 0 : data['NewHospitalized'].toString()
                                        },
                                        {
                                            "weight": "bold",
                                            "text": data === null || data === void 0 ? void 0 : data['NewDeaths'].toString(),
                                            "type": "text",
                                            "size": "xs"
                                        },
                                        {
                                            "size": "xs",
                                            "text": data === null || data === void 0 ? void 0 : data['UpdateDate'],
                                            "weight": "bold",
                                            "type": "text"
                                        },
                                        {
                                            "size": "xs",
                                            "text": data === null || data === void 0 ? void 0 : data['Source'],
                                            "weight": "bold",
                                            "type": "text"
                                        },
                                        {
                                            "type": "text",
                                            "size": "xs",
                                            "text": data === null || data === void 0 ? void 0 : data['DevBy'],
                                            "weight": "bold"
                                        },
                                        {
                                            "text": data === null || data === void 0 ? void 0 : data['SeverBy'],
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
        };
        const payload = new dialogflow_fulfillment_1.Payload(dialogflow_fulfillment_1.Platforms.LINE, payloadJson, { sendAsMessage: true });
        agent.add(payload);
    }
    catch (err) {
        console.log('err:', err);
        return;
    }
};
//# sourceMappingURL=daily.js.map