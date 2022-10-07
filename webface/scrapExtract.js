var linkList;
var extracted;
var showLink;

var extractData;
var dataOut
var slideData;

function setup(){
    noCanvas();
    var link = select('#linkScrape');
    var scraper = select('#scrape');
    linkList = select('#outList');
    extracted = select('#textOut')
    showLink = select("#showLink")
    extractData = select("#extract")
    dataOut = select("#dataOut")

    scraper.mouseClicked(getData);
    showLink.mouseClicked(getList);
    extractData.mouseClicked(getScraper)
    
    //use fetch() with async, it is more reliable when you are testing the api
    //I suppose the issue occurs if the reply is JSON object.
    async function getData() {
        print('requesting Scrape')
        var url = link.value();
        print('/load/?url='+url)
        var fetchText = await fetch('/load/?url='+url)
        var data = await fetchText.json()
        var raw = data.data;
        print(raw);
        let htmlReg = "(?<=(\s))<\w+>(?=(\s))|<(?<=<)[^<>]+(?=>)>|<(?<=<)\/[^><]+(?=>)>|<>|<|>|(?<=(\s))>\w+(?=(\s))|(?<=(\s))<\w+(?=(\s))|[\b.,?]\s{2,}|\b\s{2,}|(?<=>)\s+(?=<)"
        let regEx = new RegExp(htmlReg,'g')
        //initiating replace 
        let textData = raw.replace(regEx,'')
        extracted.html(textData)

    }

    async function getScraper() {
        print('starting Extraction')
        var url = link.value();
        print('/cheers/?url='+url)
        var fetchText = await fetch('/cheers/?url='+url)
        var data = await fetchText.json()
        var toOut = JSON.stringify(data,null,2)
        print(data);
        //creating subDivs for individual elements.
        let linkDiv = createElement('div').parent('elemOut').id('lk').class('w-50')
        let paraDiv = createElement('div').parent('elemOut').id('para').class('w-50')
        let spanDiv = createElement('div').parent('elemOut').id('spn').class('w-50')
        let listDiv = createElement('div').parent('elemOut').id('lst').class('w-50')
        
        if(data.lists.length > 10){
            createElement('h4')
                .html(`Showing 10 of ${data.lists.length} lists. `)
                .parent('lst')

            for(let xOne of data.lists.slice(0,10)){
                createElement('span')
                    .html(`${xOne} `)
                    .class('f5')
                    .parent('lst')
            }
        } else {
            for(let xOne of data.lists){
                createElement('span')
                    .html(`${xOne} `)
                    .class('f5')
                    .parent('lst')
            }
        }
        if(data.spans.length > 10){
            createElement('h4')
                .html(`Showing 10 of ${data.spans.length} Spans. `)
                .parent('spn')
            for(let xTwo of data.spans.slice(0,10)){
                createElement('span')
                    .html(`${xTwo} `)
                    .class('f5')
                    .parent('spn')
            }
        } else {
            for(let xTwo of data.spans){
                createElement('span')
                    .html(`${xTwo} `)
                    .class('f5')
                    .parent('spn')
            }
        }
        if(data.paras.length >10/2){
            createElement('h4')
                .html(`Showing 10 of ${data.paras.length} paras. `)
                .parent('para')

            for(let xThr of data.paras.slice(0,5)){
                createElement('span')
                    .html(`${xThr} `)
                    .class('f5')
                    .parent('para')
            }
        }else{
            for(let xThr of data.paras){
                createElement('span')
                    .html(`${xThr} `)
                    .class('f5')
                    .parent('para')
            }
        }

        if(data.links.length > 10){
            createElement('h4')
                .html(`Showing 10 of ${data.links.length} links. `)
                .parent('lk')

            for(let xFou of data.links.slice(0,10)){
                createElement('span')
                    .html(`${xFou} `)
                    .class('f5')
                    .parent('lk')
                }
        }else{
            for(let xFou of data.links){
                createElement('span')
                    .html(`${xFou} `)
                    .class('f5')
                    .parent('lk')
                }
        }

    }

    async function getList(){
        if(linkList.html()){
            linkList.html('')
        }
        var fetchText = await fetch(`showurl/`)
        var data = await fetchText.json()
        var linkArray = Object.entries(data)
        for(let dat of linkArray){
            createP(dat[1])
                .parent('outList')
        }
    }

}

function gotData(data) {
    
    // var time = /<time itemprop="duration" datetime="\w+?">(.*?)<\/time>/
    // var matches = raw.match(time);

    // createP(matches[1]);

    // var poster = /<link rel='image_src' href="(.*?)">/
    // matches = raw.match(poster);
    // console.log(matches);
    // var img = createImg(matches[1]);
    // img.style('width', '100px');
}

function gotList(data){
    print(data)
}