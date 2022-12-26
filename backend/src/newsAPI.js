// 'use strict';
import dotenv from "dotenv-defaults";
import request from "request";
dotenv.config();

let subscriptionKey = process.env['GUARDIANS_KEY'];
let endpoint = "http://content.guardianapis.com/search?format=json&section=world&from-date=2022-12-15&order-by=relevance&show-blocks=all&api-key=" + subscriptionKey;

// News topics you'd like to search for.
// let query = 'Microsoft';
// // Market you'd like to search in.
// let mkt = 'en-US';

let request_params = {
    method: 'GET',
    uri: endpoint,
    // headers: {
    //     'Ocp-Apim-Subscription-Key': subscriptionKey
    // },
    // qs: {
    //     q: query,
    //     mkt: mkt
    // },
    json: true
}


export default {
    callRequest : () => {
        console.log(request_params);
        request(request_params, function (error, response, body) {
            console.error('error:', error)
            console.log('statusCode:', response && response.statusCode)
            // console.log('original query: ' + body.queryContext.originalQuery)
            // console.log()
            console.log(body.response.results[0])
            console.log(body.response.results[0].blocks.body[0].bodyTextSummary)
        })
    }
}



