var searchTxt;
var txtLen;
var charLen;
var error;
var chosenFileTxt;
var sentenceOut;

function gotFile(file){
  chosenFileTxt = file.data
  if (file.type === 'text') {
    console.log(split(file.data, ' '))
    txtLen.html(file.data.split(' ').length);
    charLen.html(file.data.split('').length);
  } else {
    error.html('That is not text file.!!!')
  }
}

function getSentence(){
    const searchTerm = searchTxt.value()
    if (chosenFileTxt){
    const termIndex = chosenFileTxt.indexOf(searchTerm) 
    sentenceOut.html(chosenFileTxt.substring(termIndex - 5, termIndex + 15))
    } else {
        sentenceOut.html('Please input a file.')
    }
}

function setup(){
    noCanvas();
    txtLen = select('#length')
    charLen = select('#charLen')
    error = select('#error')
    searchTxt = select('#search')
    searchTxt.input(getSentence)
    sentenceOut = select('#senOut')
}

let sketch = function(p) {
    p.setup = function(){
        p.noCanvas()  
    fileSubmit = p.createFileInput(gotFile);
    }
  };
new p5(sketch, window.document.getElementById("textCont"));