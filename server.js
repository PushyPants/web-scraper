//Cheerio parses the HTML to allow us to find elements
const cheerio = require('cheerio');

//Request makes the HTTP request for the HTML page
const request = require('request');

//We'll use Request to pull all the HTML from the page
request('https://engadget.com/all/', function(err, res, html) {

    //Load HTML into Cheerio and make the $ variable the selector for Cheerio
    const $ = cheerio.load(html);

    let articles = [];

    $('article').each(function(i, element) {
        aTitle = $(element).find('.th-underline').text().trim();
        aSummary = $(element).find('.c-gray-3').text().trim();
        imgLink = $(element).find('.o-rating_thumb').find('img').attr('data-original');
        aLink = $(element).find('a.o-hit__link').attr('href');

        if(aTitle != '' && aSummary != '' && aLink != undefined && imgLink != undefined) {

            articles.push({
                title: aTitle,
                summary: aSummary,
                link:  aLink,
                img: imgLink
            });

        };
    });

    console.log(articles)

});