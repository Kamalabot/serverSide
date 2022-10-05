const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()


const priceList = fs.readFileSync('priceList.json')
const priceData = JSON.parse(priceList)
console.log(priceData)
const server = app.listen(3000,()=>{
    console.log('I am listening.. do you?')
})

app.use(express.static('webface'))//webface is the folder that has the static pages

app.get('/interface',(request,response)=>{
    response.send('<html><h1>This data has come directly from server as text</h1>. <p>Through this programming interface, server can write to the client display.</p><p>This server is rendered from a service called glitch where the node.js modules are supporting this website.</p><p>The website is built on a laptop, and pushed to github, which then updates the page here</p></html>')    
})

app.get('/location/:lat/:long',getLocation)

//when the url is triggered the
function getLocation(request, response){
    var data = request.params;
    var reply = '';
    if(data){
        reply += `latitude :${data.lat}, longitude:${data.long}`;
        reply += `You are ${Math.random()*10} mins from here.`
    }
    response.send(reply)
}

app.get('/details',getName)

//when the url is triggered with the format http://127.0.0.1:3000/details?named=chec
function getName(request, response){
    var url = request.query; //select the 
    if(url.name){
        var reply = `Your detail is ${JSON.stringify(url)}`
    } else {
        var reply = `Your detail is missing.`
    }
    response.send(reply)
}

app.get('/all', getPenncolors)

async function getPenncolors(request, response){
    const pennColorData = fs.readFileSync('pennTagColored.json')
    const pennColor = JSON.parse(pennColorData)
    response.send(pennColor)
}
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

app.get('/allPrice',getallPrice)

function getallPrice(request, response){
    const priceData = fs.readFileSync('priceList.json')
    const prices = JSON.parse(priceData)
    response.send(prices)
}   

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