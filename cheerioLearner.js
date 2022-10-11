const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://en.wikipedia.org/wiki/Main_Page";

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

// approach2() 

async function approach3() {
    // Fetch HTML of the page we want to scrape
       const { data } = await axios.get(url);
       // Load HTML we fetched in the previous line
       const $ = cheerio.load(data);
       console.log(data)
        // let items = $('a');
        let items = $('*');
        let attr_class = []
        let attr_id = []
        for (let ite of items){
            let tem = $(ite).attr()
            if(tem.class != undefined){
                attr_class.push(tem.class)
            }
            if(tem.id != undefined){
                attr_id.push(tem.id)
            }
        }

 
       console.log(attr_class,attr_id);
   }

approach3() 