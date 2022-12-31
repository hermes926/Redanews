// 'use strict';
import dotenv from "dotenv-defaults";
import request from "request";
import News from "./models/News.js";
import TrendingNews from "./models/TrendingNews.js";
import today from "./utils/today.js";
dotenv.config();

let subscriptionKey = process.env['GUARDIANS_KEY'];

let today_date = today.getToday();
let week_date = today.getWeek();
let endpoint = "http://content.guardianapis.com/search?format=json&from-date=" + today_date + "&order-by=newest&show-blocks=all&api-key=" + subscriptionKey;
let endpoint2 = "http://content.guardianapis.com/search?q=world&format=json&from-date=" + week_date + "&show-blocks=all&api-key=" + subscriptionKey;

let request_params = {
    method: 'GET',
    uri: endpoint,
    json: true
};

let request_params2 = {
    method: 'GET',
    uri: endpoint2,
    json: true
};

export default {
    UpdateNews : async () => {
        const date = today.getToday();
        const news = await News.findOne({date: date});
        if(!news){
            request(request_params, async function (error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    for(let i = 0; i < body.response.results.length; i += 1){
                        if(body.response.results[i].webTitle !== "" && body.response.results[i].blocks.body[0].bodyTextSummary !== ""){
                            const newNews = new News({
                                title: body.response.results[i].webTitle,
                                article: body.response.results[i].blocks.body[0].bodyTextSummary,
                                link: body.response.results[i].webUrl,
                                date: today_date, 
                            });
                            await newNews.save();
                            console.log("News at:" + today_date + " is " + body.response.results[i].webTitle + ".\n");
                            break;
                        }
                    }
                    
                }
            })
        }
    },

    UpdateTrendingNews : async () => {
        const date = today.getToday();
        const trendingNews = await TrendingNews.findOne({date: date});
        if(!trendingNews){
            TrendingNews.deleteMany({});
            request(request_params2, async function (error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    for(let i = 0; i < body.response.results.length && i < 5; i += 1){
                        if(body.response.results[i].webTitle !== "" && body.response.results[i].blocks.body[0].bodyTextSummary !== ""){
                            const newNews = new TrendingNews({
                                title: body.response.results[i].webTitle,
                                article: body.response.results[i].blocks.body[0].bodyTextSummary,
                                link: body.response.results[i].webUrl,
                                date: today_date, 
                            });
                            await newNews.save();
                            console.log("News at:" + today_date + " is " + body.response.results[i].webTitle + ".\n");
                        }
                    }
                    
                }
            })
        }
    }
}



