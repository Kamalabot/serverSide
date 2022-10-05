const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const server = app.listen(3000,()=>{
    console.log('I am listening.. do you?')
})

app.use(express.static('webface'))//webface is the folder that has the static pages

app.get('/interface',(request,response)=>{
    response.send('<html><h1>This data has come directly from server as text</h1>. <p>Through this programming interface, server can write to the client display</p></html>')    
})