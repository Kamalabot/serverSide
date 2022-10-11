const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// Async function which scrapes the data
const linkExtractor = async (url,fileId) =>{
    // Fetch HTML of the page we want to scrape
       let options = {
           headers: { 'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1' }
       }
       const { data } = await axios.get(url,options);
       // Load HTML we fetched in the previous line
       const $ = cheerio.load(data);
       
       let Items = $('a');
       let parsedItems = [];
   
       Items.each((i, elem) => {
           //parsedItems.push($(elem).text());
           //parsedItems.push($(elem).attr('href'));
           let tempLink = $(elem).attr('href')
           parsedItems.push(tempLink)
       });
    //    let joinedText = parsedItems.join('');
   
       // let fileTime = Date.now()
       // let fileName = `linkData${fileTime}.txt`
    //    console.log(joinedText)
       let writeToFile = JSON.stringify(parsedItems)
       console.log(writeToFile)
       fs.writeFile(fileId,writeToFile,'utf8',(err) => {
           if (err) throw err;
           console.log('The links file has been saved!');
       });
   }
   // Invoke the above function
   // linkExtractor(url);
   
   const textExtractor =  async (url,fileId) => {
       // Fetch HTML of the page we want to scrape
       let options = {
           headers: { 'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1' }
       }
       const { data } = await axios.get(url,options);
          // Load HTML we fetched in the previous line
       const textData = processHtml(data);
   
       const regex = /(?<=\s)[\w/\-\_]+(?=\s*)/g;
       
       const processedText = [];
       // The result can be accessed through the `m`-variable.
       
       var locRes = regex.exec(textData);
       
       while(locRes != null){
           processedText.push(locRes[0])
           locRes = regex.exec(textData)
       }
       
       let joinedText = processedText.join(' ');
   
       if (fileId == undefined){
           var fileTime = Date.now()
           var fileName = `textData${fileTime}.txt`
       } else {
           var fileName = fileId
       }
       let writeToFile = JSON.stringify(joinedText)
   
       fs.writeFile(fileName,writeToFile,'utf8',(err) => {
           if (err) throw err;
           console.log('The text data file has been saved!');
       });
   }

function processHtml(textData){
    let htmlReg = "(?<=(\s))<\w+>(?=(\s))|<(?<=<)[^<>]+(?=>)>|<(?<=<)\/[^><]+(?=>)>|<>|<|>|(?<=(\s))>\w+(?=(\s))|(?<=(\s))<\w+(?=(\s))|[\b.,?]\s{2,}|\b\s{2,}|(?<=>)\s+(?=<)"
    let regEx = new RegExp(htmlReg,'g')
    //initiating replace 
    return textData.replace(regEx,'')
}

// // URL of the page we want to scrape
// const url = "https://www.linkedin.com/jobs/view/3305570611/?refId=O0ecBkHOgeEWn6f%2FOZKDLg%3D%3D&trackingId=ScsPuL4Dyak9I9ccR0cMkA%3D%3D&trk=d_flagship3_company,https://www.linkedin.com/jobs/view/3305571285/?refId=O0ecBkHOgeEWn6f%2FOZKDLg%3D%3D&trackingId=9DCj0WWYDQfRBNkuA8pM9A%3D%3D&trk=d_flagship3_company,https://www.linkedin.com/jobs/view/3292150169/?refId=%7B%EF%BF%BDR%EF%BF%BD%23%5D%EF%BF%BD%EF%BF%BD%EF%BF%BD%EF%BF%BD%EF%BF%BD%EF%BF%BD%0F_g%EF%BF%BD&trk=d_flagship3_profile_view_base";

// //The links can be either single or seperated by coma

// const processUrl = url.split(',')

// if(processUrl.length > 1){
//     console.log('multi File')
//     for(let url in processUrl){
//         let urlSplit = url.split('.')
//         let fileTime = Date.now()
//         let linkFile = `linksIn${urlSplit[1]}.txt`
//         let textFile = `textIn${urlSplit[1]}.txt`
//         // linkExtractor(url,linkFile)
//         textExtractor(url,textFile)
//     }
// } else {
//     console.log('single File')
//     let urlSplit = url.split('.')
//     let fileTime = Date.now()
//     let linkFile = `linksIn${urlSplit[1]}.txt`
//     let textFile = `textIn${urlSplit[1]}.txt`
//     linkExtractor(url,linkFile)
//     textExtractor(url,textFile)
// }

module.exports = {textExtractor, linkExtractor}