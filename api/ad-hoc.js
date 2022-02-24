"use strict";

import { httpRequest } from "../util/http.js";
import { API_KEY } from "../api-key.js";

export async function getBusServices() {
    let data = [];
    for (let skip = 0; ; skip += 500) {
        let records = await httpRequest({
            hostname: "datamall2.mytransport.sg",
            path: `/ltaodataservice/BusServices?$skip=${skip}`,
            headers: {
                "AccountKey": API_KEY,
            }
        }).then(data => JSON.parse(data).value);
        if (records.length === 0) {
            break;
        }
        data = data.concat(records);
    }
    return data;
}

export async function getBusRoutes() {
    let data = [];
    for (let skip = 0; ; skip += 500) {
        let records = await httpRequest({
            hostname: "datamall2.mytransport.sg",
            path: `/ltaodataservice/BusRoutes?$skip=${skip}`,
            headers: {
                "AccountKey": API_KEY,
            }
        }).then(data => JSON.parse(data).value);
        if (records.length === 0) {
            break;
        }
        data = data.concat(records);
    }
    return data;
}

export async function getBusStops() {
    let data = [];
    for (let skip = 0; ; skip += 500) {
        let records = await httpRequest({
            hostname: "datamall2.mytransport.sg",
            path: `/ltaodataservice/BusStops?$skip=${skip}`,
            headers: {
                "AccountKey": API_KEY,
            }
        }).then(data => JSON.parse(data).value);
        if (records.length === 0) {
            break;
        }
        data = data.concat(records);
    }
    return data;
}
