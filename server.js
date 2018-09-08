//Dependencies
const express = require('express');
const mongoose = require('mongoose');

//Cheerio parses the HTML to allow us to find elements
const cheerio = require('cheerio');

//Request makes the HTTP request for the HTML page
const request = require('request');

//Require all models
const db = require('./models');

const PORT = 3000;

//Initialize Express
const app = express();

//Database configuration
mongoose.connect('mongodb://localhost/news_scraper_db');

console.log(db.articles)

//Set the root to scrape/rescrape articles
app.get('/', function(req, res) {
    
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
                db.Articles.create({
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
    //Send confirmation to browser
    res.send("scrape complete");
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

app.listen(PORT, function() {
    console.log(`App listening on port: ${PORT}!`);
});