//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

//Cheerio parses the HTML to allow us to find elements
const cheerio = require('cheerio');

//Request makes the HTTP request for the HTML page
const request = require('request');

//Require all models
const db = require('./models');

//Set port for dev and deployment
const PORT = process.env.PORT || 3000;

//Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Database configuration for dev & deployment
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/news_scraper_db';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//Set the root to scrape/rescrape articles
app.get('/', function(req, res) {
    console.log('trying to run route: 1')
    //We'll use Request to pull all the HTML from the page
    request('https://engadget.com/all/', function(err, res, html) {
        console.log('trying to run route: 2')
        //Load HTML into Cheerio and make the $ variable the selector for Cheerio
        const $ = cheerio.load(html);
    
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
                    link:  'https://engadget.com'+aLink,
                    img: imgLink
                },
                function(err, data) {
                    if (err) {
                       // console.log(err);
                    } else {
                       // console.log(data);
                    };
                });
            };
        });
            
    });
    //Send confirmation to browser
    console.log('trying to run route: 3')
    res.render('index');
});

//Set route to retrieve data from the db
app.get('/all', function(req, res) {
    db.Articles.find({}, null, {sort: {"_id":-1}}, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            res.json(response);
        };
    });
});

//Set route to retrieve saved articles from the db
app.get('/getSaved', function(req, res) {
    db.Articles.find({saved: true}, null, {sort: {"_id":1}}, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            res.json(response);
        };
    });
});

app.get('/saved', function(req, res) {
    res.render('index');
});

app.listen(PORT, function() {
    console.log(`App listening on port: ${PORT}!`);
});