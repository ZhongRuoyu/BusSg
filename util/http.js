"use strict";

import * as http from "http";

/**
 * A promisified version of `http.request`.
 * @param {object} options an object containing the options for the HTTP request
 * @returns the body of the HTTP response, wrapped in a `Promise`.
 */
export function httpRequest(options) {
    return new Promise((resolve, reject) => {
        http.request(options, response => {
            if (response.statusCode !== 200) {
                reject(new Error(`Status code: ${response.statusCode}`));
            }
            response.setEncoding("utf8");
            let data = "";
            response.on('data', chunk => {
                data += chunk;
            });
            response.on("end", () => {
                resolve(data);
            });
        }).on("error", (err) => {
            reject(err);
        }).end();
    });
}
