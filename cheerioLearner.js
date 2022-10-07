const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://p5js.org/";

// Async function which scrapes the data
async function approach1() {
 // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    
    let parsedItems = $('ul li').map(function() {
        return {
            descr: $('div', this).html().replace(/\s\s+/g, ' ').trim(),
            price: $('div', this).text().replace('$', '')
        }
    }).toArray();

    console.log(parsedItems);
}
// Invoke the above function
//approach1() fails;

async function approach2() {
    // Fetch HTML of the page we want to scrape
       const { data } = await axios.get(url);
       // Load HTML we fetched in the previous line
       const $ = cheerio.load(data);
       
        // let items = $('a');
        let items = $('li');
        //let items = $('p');
        // let items = $('span');
        let parsedItems = [];
        items.each((i, elem) => {
            //parsedItems.push($(elem).text());
            //parsedItems.push($(elem).attr('href'));
            parsedItems.push($(elem).text())
        });
 
       console.log(parsedItems);
   }

approach2() 