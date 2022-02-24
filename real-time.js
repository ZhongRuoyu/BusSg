"use strict";

import { httpRequest } from "./http.js";
import { API_KEY } from "./api-key.js";

export async function getBusArrival(busStopCode, serviceNo) {
    let path = `/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}`;
    if (serviceNo !== undefined) {
        path += `&ServiceNo=${serviceNo}`;
    }
    return httpRequest({
        hostname: "datamall2.mytransport.sg",
        path: path,
        headers: {
            "AccountKey": API_KEY,
        }
    }).then(data => JSON.parse(data).Services);
}
