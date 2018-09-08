//Dependencies
const express = require('express');
const mongojs = require('mongojs');

//Cheerio parses the HTML to allow us to find elements
const cheerio = require('cheerio');

//Request makes the HTTP request for the HTML page
const request = require('request');

//Initialize Express
const app = express();

//Database configuration
const databaseUrl = 'news_scraper_db';
const collections = ['articles', 'comments'];

//Tie mongojs config to the db variable
const db = mongojs(databaseUrl, collections);
db.on('error', function(error) {
    console.log('Database error:', error);
});

//Set route to retrieve data from the db
app.get('/all', function(req, res) {
    db.articles.find({}, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            res.json(response);
        };
    });
});

// app.get('/scrape', function(req, res) {
    
    //We'll use Request to pull all the HTML from the page
    request('https://engadget.com/all/', function(err, res, html) {
    
        //Load HTML into Cheerio and make the $ variable the selector for Cheerio
        const $ = cheerio.load(html);
    
        // let articles = [];
    
        $('article').each(function(i, element) {
            aTitle = $(element).find('.th-underline').text().trim();
            aSummary = $(element).find('.c-gray-3').text().trim();
            imgLink = $(element).find('.o-rating_thumb').find('img').attr('data-original');
            aLink = $(element).find('a.o-hit__link').attr('href');
    
            //make sure that none of the db fields are blank/null/undefined
            if(aTitle != '' && aSummary != '' && aLink != undefined && imgLink != undefined) {

                //insert data in db
                db.articles.insert({
                    title: aTitle,
                    summary: aSummary,
                    link:  aLink,
                    img: imgLink
                },
                function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    };
                });
            };
        });    
    });
//     //Send confirmation to browser
//     res.send("scrape complete");
// });

app.listen(3000, function() {
    console.log('app litening on port 3000.')
});