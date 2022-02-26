"use strict";

import { getBusServices, getBusRoutes, getBusStops } from "./api/ad-hoc.js";
export { getBusArrival } from "./api/real-time.js";

const LOADERS = {
    "BusServices": getBusServices,
    "BusRoutes": getBusRoutes,
    "BusStops": getBusStops,
};

function strContainsIgnoreCase(str1, str2) {
    return str1.toLowerCase().indexOf(str2.toLowerCase()) !== -1;
}

function strEqualIgnoreCase(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
}

function load(item) {
    return LOADERS[item]()
        .catch(err => {
            console.log(err);
            return [];
        });
}

export function getBusServicesByDescription(description) {
    return load("BusServices").then(data => data.filter(service => {
        return strContainsIgnoreCase(service.ServiceNo, description) ||
            strContainsIgnoreCase(service.LoopDesc, description);
    }));
}

export function getBusServiceByServiceNo(serviceNo) {
    return load("BusServices").then(data => {
        return data.filter(service => strEqualIgnoreCase(service.ServiceNo, serviceNo));
    });
}

export function getBusRouteByServiceNo(serviceNo) {
    return load("BusRoutes").then(data => data.filter(stop => {
        return strEqualIgnoreCase(stop.ServiceNo, serviceNo);
    }));
}

export function getBusStopsByDescription(description) {
    return load("BusStops").then(data => data.filter(stop => {
        return strContainsIgnoreCase(stop.BusStopCode, description) ||
            strContainsIgnoreCase(stop.RoadName, description) ||
            strContainsIgnoreCase(stop.Description, description);
    }));
}

export function getBusStopByCode(code) {
    return load("BusStops").then(data => {
        return data.filter(stop => strEqualIgnoreCase(stop.BusStopCode, code))[0] || null;
    });
}
