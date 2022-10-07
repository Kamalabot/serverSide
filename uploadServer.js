//Learn to implement a file upload using multer from front end
//Vaguely learnt how the file naming works in multer
//Learnt that fs.readFile() can be used to read the file
//Finding a way to continue the activity on the file data once it is loaded.
//Like sending the file data back to front end, which can be done only through req, res
//need to have a data base that tracks the file, with it location
//one has to send JSON only... Don't try to send any other variable type.

const express = require('express')
const cors = require('cors')
const fs = require('fs')

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express()

const server = app.listen(3000,()=>{
    console.log('I am listening.. temporarily')
})

app.use(express.static('webface'))//webface is the folder that has the static pages

const {uploadFile, listFile, filePath} = require('./uploadFile')

app.post('/upload',upload.single('data'),uploadFile)

app.get('/listfile',listFile)

app.get('/uploads/:filePath',filePath)
