//Learn to implement a file upload using multer from front end
//Vaguely learnt how the file naming works in multer
//Learnt that fs.readFile() can be used to read the file
//Finding a way to continue the activity on the file data once it is loaded.
//Like sending the file data back to front end, which can be done only through req, res
//need to have a data base that tracks the file, with it location



const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express()

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

const server = app.listen(3000,()=>{
    console.log('I am listening.. temporarily')
})

app.use(express.static('webface'))//webface is the folder that has the static pages


app.post('/upload',upload.single('data'),function (req, res, next){
    console.log(req.file)
    const upDb= fs.readFileSync('uploadDatabase.json')
    
    if(upDb.length == 0){
        var upDbObj = new Object()
        if(!upDbObj.hasOwnProperty(req.file.originalname)){
            upDbObj[req.file.originalname] = `./uploads/${req.file.filename}`;
        }
            
        const newUpDb = JSON.stringify(upDbObj,null,2);
        
        fs.writeFileSync('uploadDatabase.json',newUpDb,()=>{
            console.log('Done Writing')
        })
    } else {
        const upDbObj = JSON.parse(upDb)
        
        if(!upDbObj.hasOwnProperty(req.file.originalname)){
            upDbObj[req.file.originalname] = `./uploads/${req.file.filename}`;
        }
        
        const newUpDb = JSON.stringify(upDbObj,null,2);
        
        fs.writeFileSync('uploadDatabase.json',newUpDb,()=>{
            console.log('Done Writing')
        })
    }
})

app.get('/listfile',(req,res)=>{
    const upDb= fs.readFileSync('uploadDatabase.json')
    const upDbString = JSON.parse(upDb)
    //console.log(upDbString)
    res.send(upDbString)
})

//one has to send JSON only... Don't try to send any other variable type.
app.get('/uploads/:filePath',(req,res)=>{
    var data = req.params;
    console.log(data)
    const textD= fs.readFile(`./uploads/${data.filePath}`,(err,data)=>{
        // const text = data.toString()
        var data = {
            text : data.toString()
        }
        res.send(data)
    })
    
})


const newupload = multer({ dest: './public/data/uploads/' })

app.post('/stats', newupload.single('uploaded_file'), function (req, res) {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
   console.log(req.file)
});