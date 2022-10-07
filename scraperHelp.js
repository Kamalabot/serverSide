const cheerio = require('cheerio')
const fs = require('fs')

// Callback
const loadScraper = function (req, res) {
    // Get the URL from the user
    // console.log('reaching Load')
    var providedUrl = req.query.url;
    // Execute the HTTP Request
    request(providedUrl, loaded);

    // Callback for when the request is complete
    function loaded(error, response, body) {
        console.log('reaching request')
        // Check for errors
        if (!error && response.statusCode == 200) {
            // The raw HTML is in body
            $ = cheerio.load(body)    
            
            let itemsA = $('a');
            let itemsLi = $('li');
            let itemsP = $('p');
            let itemsS = $('span');
            let parsedItemsA = [];
            let parsedItemsLi = [];
            let parsedItemsS = [];
            let parsedItemsP = [];
            itemsA.each((i, elem) => {
                parsedItemsA.push($(elem).attr('href'));
            });
            itemsLi.each((i, elem) => {
                parsedItemsLi.push($(elem).text());
            });
            itemsP.each((i, elem) => {
                parsedItemsP.push($(elem).text());
            });
            itemsS.each((i, elem) => {
                parsedItemsS.push($(elem).text());
            });
            const reply ={
                links: parsedItemsA,
                spans: parsedItemsS,
                paras: parsedItemsP,
                lists: parsedItemsLi
            }

            console.dir(reply);
            // const scrapedData = JSON.stringify(reply,null,2);

            // fs.writeFileSync('extracted.json',scrapedData,()=>{
            //     console.log('Done Writing')
            // })
            res.send(reply)
        } else {
            res.send('error');
        }
    }
}
var request = require('request');
// Callback
const loadURL = function(req, res) {
    // Get the URL from the user
    // console.log('reaching Load')
    var providedUrl = req.query.url;
    // Store URL to file
    const readStore = fs.readFileSync('linkScraped.json')
    if(readStore.length == 0){
        var lInd = 0
        var prop = `link_${lInd}`
        var linkStore = {}
        // console.log('reaching linkStore')
        linkStore[prop] = providedUrl;
        const linkDb = JSON.stringify(linkStore,null,2);

        fs.writeFileSync('linkScraped.json',linkDb,()=>{
            console.log('Done Writing')
        })

    } else {
        // console.log('reaching linkStore else')
        const readStoreObj = JSON.parse(readStore)
        const storeEntry = Object.entries(readStoreObj)
        var lInd = storeEntry.length + 1
        var prop = `link_${lInd}`
        readStoreObj[prop] = providedUrl;

        const newUpDb = JSON.stringify(readStoreObj,null,2);

        fs.writeFileSync('linkScraped.json',newUpDb,()=>{
            console.log('Done Writing')
        })
    }
 
  // Execute the HTTP Request
  request(providedUrl, loaded);

  // Callback for when the request is complete
  function loaded(error, response, body) {
    console.log('reaching request')
    // Check for errors
    if (!error && response.statusCode == 200) {
      // The raw HTML is in body
        console.log('sending body')
        reply = {
            data:body
        }
        res.send(reply);
    } else {
        res.send('error');
    }
  }
}

exports.loadScraper = loadScraper;
exports.loadURL = loadURL;