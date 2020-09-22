"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeCountry = exports.searchFlight = void 0;
const axios_1 = __importDefault(require("axios"));
const urlCode = `https://gist.githubusercontent.com/ssskip/5a94bfcd2835bf1dea52/raw/1c16c6ab66eb72e47401110bc977977970238877/ISO3166-1.alpha2.json`;
const kiwiFlight = `https://api.skypicker.com/flights`;
exports.searchFlight = (data) => {
    return new Promise((resolve, reject) => {
        const option = {
            url: `${kiwiFlight}`,
            method: 'get',
            params: data,
            responseType: 'json'
        };
        axios_1.default(option).then(res => {
            const { data } = res;
            resolve(data.data);
        }).catch(err => reject(err));
    });
};
exports.getCodeCountry = (country) => {
    return new Promise((resolve, reject) => {
        const option = {
            url: urlCode,
            method: 'get',
            responseType: 'json'
        };
        axios_1.default(option).then(res => {
            const { data } = res;
            for (let key in data) {
                if (data[key].toLowerCase() == country.toLowerCase()) {
                    console.log('codeCountry:', key);
                    resolve(key);
                }
            }
            reject('try again');
        });
    });
};
//# sourceMappingURL=search.js.map