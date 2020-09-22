"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindLocation = exports.GETDATADAILY = void 0;
const axios_1 = __importDefault(require("axios"));
const setting_1 = require("../setting");
const lodash_1 = __importStar(require("lodash"));
const moment_1 = __importDefault(require("moment"));
const dialogflow_fulfillment_1 = require("dialogflow-fulfillment");
const testUrl = 'https://www.google.co.th/maps/place/Chiang+Mai,+Mueang+Chiang+Mai+District,+Chiang+Mai/@18.7942426,98.9213718,13z/data=!3m1!4b1!4m5!3m4!1s0x30da3a7e90bb6f5d:0x98d46270a59b4367!8m2!3d18.7883439!4d98.9853008?hl=en&authuser=0';
const urlDaily = `https://opend.data.go.th/get-ckan/datastore_search`;
const urlProvince = "https://api.longdo.com/map/services/address";
const urlProvinceEN = `https://opend.data.go.th/get-ckan/datastore_search`;
const limit = 500;
exports.GETDATADAILY = async (agent) => {
    var _a, _b, _c, _d;
    let parameters = agent.parameters;
    console.log('parameters:', parameters);
    const url = agent.query;
    const findLocation = await exports.FindLocation(((parameters === null || parameters === void 0 ? void 0 : parameters.lat) && (parameters === null || parameters === void 0 ? void 0 : parameters.long)) ? parameters : url);
    let offset = 0;
    console.log('findLocation:', findLocation);
    let province = (_a = findLocation === null || findLocation === void 0 ? void 0 : findLocation.province) === null || _a === void 0 ? void 0 : _a.replace('จ.', '');
    let pvEN = await axios_1.default({
        method: "get",
        url: urlProvinceEN,
        headers: {
            "api-key": setting_1.API_KEY_DGA,
        },
        params: {
            resource_id: "48039a2a-2f01-448c-b2a2-bb0d541dedcd",
            q: province
        }
    });
    // console.log('pvEN:',pvEN)
    pvEN = lodash_1.get(pvEN, ['data', 'result', 'records', 0]);
    console.log('pvEN:', pvEN);
    if (province.indexOf('กรุงเทพ') > -1)
        province = 'กทม';
    console.log('province:', province);
    let options = {
        method: "get",
        url: urlDaily,
        headers: {
            "api-key": setting_1.API_KEY_DGA,
        },
        params: {
            resource_id: "0d3feada-3484-476f-85f7-c3edeb60a85d",
            q: province,
            offset,
            limit
        }
    };
    try {
        let { data } = await axios_1.default(options);
        let result = lodash_1.default.cloneDeep((_b = data === null || data === void 0 ? void 0 : data.result) === null || _b === void 0 ? void 0 : _b.records);
        let total = (_c = data === null || data === void 0 ? void 0 : data.result) === null || _c === void 0 ? void 0 : _c.total;
        while (offset + limit < total && offset > -1) {
            offset = total - limit;
            let { data } = await axios_1.default(options);
            result = result.concat((_d = data === null || data === void 0 ? void 0 : data.result) === null || _d === void 0 ? void 0 : _d.records);
        }
        // if(result.total > 100){
        //   offset = result.total - 100
        //   options.params.offset = offset
        //   let { data }= await axios(options)
        //   result = result.concat(_.cloneDeep(data?.result))
        // }
        console.log('result length', result.length);
        const SortByDate = await lodash_1.default.sortBy(result || [], (e) => {
            return new Date(e['Notification date']) || new Date(e['Announce Date']);
        }).reverse();
        let now = new Date().setHours(0, 0, 0, 0);
        let lastestCase = lodash_1.get(SortByDate, [0]);
        let safeDate14 = moment_1.default((lastestCase === null || lastestCase === void 0 ? void 0 : lastestCase['Notification date']) || (lastestCase === null || lastestCase === void 0 ? void 0 : lastestCase['Announce Date'])).add(14, 'days').toDate().setHours(0, 0, 0, 0);
        let safeDate26 = moment_1.default((lastestCase === null || lastestCase === void 0 ? void 0 : lastestCase['Notification date']) || (lastestCase === null || lastestCase === void 0 ? void 0 : lastestCase['Announce Date'])).add(14, 'days').toDate().setHours(0, 0, 0, 0);
        // console.log('lastestCase',lastestCase)
        // console.log('safeDate14',safeDate14)
        // console.log('now',now)
        // console.log('safe 26', safeDate26 < now)
        // console.log('safe 14', safeDate14 < now)
        const payloadJson = {
            "type": "flex",
            "altText": "Check covid by area",
            "contents": {
                "type": "bubble",
                "direction": "ltr",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "margin": "sm",
                    "contents": [
                        {
                            "type": "text",
                            "text": `The Latest patient in ${pvEN === null || pvEN === void 0 ? void 0 : pvEN['CHANGWAT_E']}`,
                            "size": "lg",
                            "align": "center",
                            "weight": "bold",
                            "color": "#AA1FA5"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "spacer"
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "spacer",
                                            "size": "md"
                                        },
                                        {
                                            "type": "text",
                                            "text": `Case Number : `,
                                            "size": "xs",
                                            "align": "start"
                                        },
                                        {
                                            "type": "text",
                                            "text": "Date :",
                                            "size": "xs"
                                        },
                                        {
                                            "type": "text",
                                            "text": "Age :",
                                            "size": "xs"
                                        },
                                        {
                                            "type": "text",
                                            "text": "Sex :",
                                            "size": "xs"
                                        },
                                        {
                                            "type": "text",
                                            "text": `Nationality : `,
                                            "size": "xs"
                                        },
                                        {
                                            "type": "text",
                                            "text": `Province : `,
                                            "size": "xs"
                                        },
                                        {
                                            "type": "text",
                                            "text": "District :",
                                            "size": "xs"
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "spacer",
                                            "size": "md"
                                        },
                                        {
                                            "type": "text",
                                            "text": `${lastestCase === null || lastestCase === void 0 ? void 0 : lastestCase.no}`,
                                            "size": "xs",
                                            "align": "start",
                                            "weight": "bold"
                                        },
                                        {
                                            "type": "text",
                                            "text": `${moment_1.default(lastestCase === null || lastestCase === void 0 ? void 0 : lastestCase['Notification date']).format('YYYY-MM-DD')}`,
                                            "size": "xs",
                                            "weight": "bold"
                                        },
                                        {
                                            "type": "text",
                                            "text": `${lastestCase === null || lastestCase === void 0 ? void 0 : lastestCase.age}`,
                                            "size": "xs",
                                            "weight": "bold"
                                        },
                                        {
                                            "type": "text",
                                            "text": `${(lastestCase === null || lastestCase === void 0 ? void 0 : lastestCase.sex) == 'หญิง' ? "Female" : "Male"}`,
                                            "size": "xs",
                                            "weight": "bold"
                                        },
                                        {
                                            "type": "text",
                                            "text": `${lastestCase === null || lastestCase === void 0 ? void 0 : lastestCase.nationality}`,
                                            "size": "xs",
                                            "weight": "bold"
                                        },
                                        {
                                            "type": "text",
                                            "text": `${pvEN === null || pvEN === void 0 ? void 0 : pvEN['CHANGWAT_E']}`,
                                            "size": "xs",
                                            "weight": "bold"
                                        },
                                        {
                                            "type": "text",
                                            "text": "district of onset",
                                            "size": "xs",
                                            "weight": "bold"
                                        }
                                    ]
                                },
                                {
                                    "type": "spacer",
                                    "size": "lg"
                                }
                            ]
                        }
                    ]
                }
            }
        };
        const payload = new dialogflow_fulfillment_1.Payload(dialogflow_fulfillment_1.Platforms.LINE, payloadJson, { sendAsMessage: true });
        agent.add(payload);
        return Object.assign(Object.assign({}, lastestCase), { safePlace14: safeDate14 < now, safePlace26: safeDate26 < now });
    }
    catch (err) {
        console.log('err:', err);
        return;
    }
};
exports.FindLocation = async (url) => {
    const { lat, long } = typeof url === 'object' ? url : await getLocationByUrl(url);
    console.log('lat', lat, 'long', long);
    return Province(lat, long);
};
const getLocationByUrl = (url = testUrl) => {
    var _a;
    const regex = new RegExp('@(.*),(.*),');
    let lon_lat_match = url.match(regex) || [];
    if (lon_lat_match.length) {
        return { lat: (_a = lon_lat_match[1]) === null || _a === void 0 ? void 0 : _a.replace('@', ''), long: lon_lat_match[2] };
    }
    return { lat: "", long: "" };
};
const Province = (lat, lon) => {
    const config = {
        method: "get",
        url: urlProvince,
        params: {
            lat, lon, key: setting_1.API_KEY_LONGDO
        }
    };
    return axios_1.default(config).then((res) => {
        if (res.data) {
            return res.data;
        }
        else
            return;
    });
};
//# sourceMappingURL=findlocation.js.map