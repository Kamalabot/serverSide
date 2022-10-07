const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express()

const priceList = fs.readFileSync('priceList.json')
const priceData = JSON.parse(priceList)
console.log(priceData)
const server = app.listen(3000,()=>{
    console.log('I am listening.. do you?')
})

app.use(express.static('webface'))//webface is the folder that has the static pages

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

app.use(cors())

app.get('/interface',(request,response)=>{
    response.send('<html><h1>This data has come directly from server as text</h1>. <p>Through this programming interface, server can write to the client display.</p><p>This server is rendered from a service called glitch where the node.js modules are supporting this website.</p><p>The website is built on a laptop, and pushed to github, which then updates the page here</p></html>')    
})

const {getName, getLocation} = require('./wordsInterface')
app.get('/location/:lat/:long',getLocation)

app.get('/details',getName)

//it is adding and writing to the file.
app.get('/add/:item/:price',addWord)

function addWord(request, response){
    const data = request.params;
    const item = data.item;
    const price = parseFloat(data.price);
    var reply = '';
    
    if(item == '' || price == ''){
        reply = 'The item price or name is not provided'
    }else{
        priceData[item] = price;
        console.log(priceData)
        var priceToFile = JSON.stringify(priceData, null, 2)
        fs.writeFile('priceList.json', priceToFile, finishedWrite)

        function finishedWrite(){
            console.log('Done Writing')
            reply = {
                item: item,
                price: price,
                status: 'success'
            }
            response.send(reply)
        }
    }
}

app.get('/all', getPenncolors)

async function getPenncolors(request, response){
    const pennColorData = fs.readFileSync('pennTagColored.json')
    const pennColor = JSON.parse(pennColorData)
    response.send(pennColor)
}


app.get('/allPrice',getallPrice)

function getallPrice(request, response){
    const priceData = fs.readFileSync('priceList.json')
    const prices = JSON.parse(priceData)
    response.send(prices)
}   

const {uploadFile, listFile, filePath} = require('./uploadFile')

app.post('/upload',upload.single('data'),uploadFile)

app.get('/listfile',listFile)

app.get('/uploads/:filePath',filePath)

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log(`User with id: ${socket.id} has connected`);
    socket.on('mouse',mouseMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse',data);
        console.log(data)
    }


    socket.on('disconnect',()=>{
        console.log(`User with id: ${socket.id} disconnected`)
    })
  });

//challenge is 
//Get the file from frontend : done 
//send it to backend : done
//save it to backend server : done
//process something 
//send it back when called, are programmed.

// This is a module for HTTP Requests

const {loadScraper, loadURL} = require('./scraperHelp')
// A router to load a URL
app.get('/load', loadURL);

app.get('/cheers', loadScraper);

// A route to show the URLs in the file
app.get('/showurl', showURL);

// Callback
function showURL(req, res){
    console.log('reaching showURL')
    const linkData = fs.readFileSync('linkScraped.json')
    const links = JSON.parse(linkData)
    console.log('sending ShowURL')
    res.send(links)
}
