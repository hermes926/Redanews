// 'use strict';
import dotenv from "dotenv-defaults";
import request from "request";
import News from "./models/News.js";
import today from "./utils/today.js";
dotenv.config();

let subscriptionKey = process.env['GUARDIANS_KEY'];

let today_date = today.getToday();
let endpoint = "http://content.guardianapis.com/search?format=json&section=world&from-date=" + today_date + "&order-by=newest&show-blocks=all&api-key=" + subscriptionKey;

let request_params = {
    method: 'GET',
    uri: endpoint,
    json: true
}


export default {
    UpdateNews : () => {
        request(request_params, async function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                const newNews = new News({
                    title: body.response.results[0].webTitle,
                    article: body.response.results[0].blocks.body[0].bodyTextSummary,
                    date: today_date, 
                });
                await newNews.save();
                console.log("News at:" + today + " is " + body.response.results[0].webTitle + ".\n");
            }
        })
    }
}



