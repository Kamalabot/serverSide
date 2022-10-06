var getFile, putext;
var askData, fileLoc,fileData
function setup(){
    getFile = select('#getFile')
    putext = select('#textArea')

    getFile.mouseClicked(loadFiles)

    askData = select('#askData');
    fileData = select('#fileData');
    fileLoc = select('#fileLoc')

    askData.mouseClicked(openAndSee)
}

async function loadFiles(){

    var fetchList = await fetch('listfile/')
    var listData = await fetchList.json();
    print(`This is fetch:${listData}`)

    var arrayFiles = Object.entries(listData)
    putext.html('')
    for(let elt of arrayFiles){
        createElement('span')
            .parent('textArea')
            .html(`${elt[0]} : ${elt[1]}`)
        createElement('br')
            .parent('textArea')
    }
}
//you have to recieve the JSON only.
async function openAndSee(){
    var filePath = fileLoc.value();
    print(filePath)
    var fetchText = await fetch(`uploads/${filePath}`)
    var data = await fetchText.json()
    // var fetchText = httpGet(`uploads/${filePath}`,(data,err)=>{
    print(data.text)
    fileData.html(data.text)
    
}